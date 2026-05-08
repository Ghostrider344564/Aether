import { INode } from "../WorkflowEngine";

export default class StartNode implements INode {
  constructor(private parameters: any) {}
  async execute(input: any, context: any): Promise<any> {
    return input || {};
  }
}
