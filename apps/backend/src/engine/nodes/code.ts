import { INode } from "../WorkflowEngine";
import * as vm from 'vm';

export default class CodeNode implements INode {
  constructor(private parameters: any) {}

  async execute(input: any, context: any): Promise<any> {
    const code = this.parameters.jsCode || 'return item;';

    const script = new vm.Script(`
      (async () => {
        const item = ${JSON.stringify(input)};
        ${code}
      })()
    `);

    const result = await script.runInNewContext({
      console,
      Buffer,
    });

    return result;
  }
}
