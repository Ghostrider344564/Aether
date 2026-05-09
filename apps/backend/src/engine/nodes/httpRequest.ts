import axios from 'axios';
import { INode } from "../WorkflowEngine";
import { ExpressionEngine } from "../ExpressionEngine";

export default class HttpRequestNode implements INode {
  constructor(private parameters: any) {}

  async execute(input: any, context: any): Promise<any> {
    const url = ExpressionEngine.evaluate(this.parameters.url, context);
    const method = this.parameters.method || 'GET';
    const body = this.parameters.body ? ExpressionEngine.evaluate(this.parameters.body, context) : undefined;

    const response = await axios({
      method,
      url,
      data: body,
      responseType: 'arraybuffer',
    });

    // Check if response is binary
    const contentType = String(response.headers['content-type'] || '');
    if (contentType && (contentType.includes('image') || contentType.includes('application/octet-stream'))) {
      const { BinaryDataService } = await import('../../services/BinaryDataService');
      const fileId = await BinaryDataService.save(Buffer.from(response.data), 'downloaded_file', contentType);
      return { fileId, contentType, info: 'File saved to BinaryDataService' };
    }

    // Default to JSON if possible
    try {
      const json = JSON.parse(response.data.toString());
      return json;
    } catch (e) {
      return response.data.toString();
    }
  }
}
