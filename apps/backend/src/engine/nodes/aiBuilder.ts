import { INode } from "../WorkflowEngine";
import axios from 'axios';

export default class AiBuilderNode implements INode {
  constructor(private parameters: any) {}

  async execute(input: any, context: any): Promise<any> {
    const prompt = this.parameters.prompt;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return { error: 'OpenAI API key not configured' };
    }

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an n8n workflow expert. Return JSON representing a workflow structure based on the prompt.' },
          { role: 'user', content: prompt }
        ]
      }, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });

      return response.data.choices[0].message.content;
    } catch (err: any) {
      return { error: err.message };
    }
  }
}
