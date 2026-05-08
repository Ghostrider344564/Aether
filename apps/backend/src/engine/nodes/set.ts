import { INode } from "../WorkflowEngine";
import { ExpressionEngine } from "../ExpressionEngine";

export default class SetNode implements INode {
  constructor(private parameters: any) {}

  async execute(input: any, context: any): Promise<any> {
    const values = this.parameters.values || [];
    const output = { ...input };

    for (const entry of values) {
      output[entry.name] = ExpressionEngine.evaluate(entry.value, context);
    }

    return output;
  }
}
