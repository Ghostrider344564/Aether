import { INode } from "../WorkflowEngine";
import { ExpressionEngine } from "../ExpressionEngine";

export default class IfNode implements INode {
  constructor(private parameters: any) {}

  async execute(input: any, context: any): Promise<any> {
    const value1 = ExpressionEngine.evaluate(this.parameters.value1, context);
    const value2 = ExpressionEngine.evaluate(this.parameters.value2, context);
    const operator = this.parameters.operator || 'equal';

    let result = false;
    switch (operator) {
      case 'equal': result = value1 === value2; break;
      case 'notEqual': result = value1 !== value2; break;
      // Add more operators as needed
    }

    return { ...input, __branch: result ? 'true' : 'false' };
  }
}
