import { INode } from "../WorkflowEngine";

export default class WaitNode implements INode {
  constructor(private parameters: any) {}

  async execute(input: any, context: any): Promise<any> {
    const seconds = this.parameters.seconds || 5;

    // To ensure this survives a server restart in a production-grade clone,
    // we would ideally suspend the job in BullMQ with a delay.
    // For this implementation, we use a robust promise-based delay.
    console.log(`Waiting for ${seconds} seconds...`);
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));

    return input;
  }
}
