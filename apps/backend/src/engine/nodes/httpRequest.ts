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
    });

    return response.data;
  }
}
