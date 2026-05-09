import { INode } from "../WorkflowEngine";
import * as vm from 'vm';

export default class CodeNode implements INode {
  constructor(private parameters: any) {}

  async execute(input: any, context: any): Promise<any> {
    const code = this.parameters.jsCode || 'return item;';

    const script = new vm.Script(`(async (item) => { ${code} })(item)`);
    const context = vm.createContext({
      console,
      Buffer,
      item: input,
    });
    const result = await script.runInContext(context, { timeout: 5000 });

    return result;
  }
}
