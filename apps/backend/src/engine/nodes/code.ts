import { INode } from "../WorkflowEngine";
import ivm from 'isolated-vm';

export default class CodeNode implements INode {
  constructor(private parameters: any) {}

  async execute(input: any, executionContext: any): Promise<any> {
    const code = this.parameters.jsCode || 'return item;';

    // Create a new isolate with a 128MB memory limit
    const isolate = new ivm.Isolate({ memoryLimit: 128 });
    const context = isolate.createContextSync();
    const jail = context.global;

    // Set up global object for the script
    jail.setSync('global', jail.derefInto());

    // Serialize input data
    const inputTransferable = new ivm.ExternalCopy(input).copyInto();
    jail.setSync('item', inputTransferable);

    // Prepare and run the script
    const script = isolate.compileScriptSync(`
      (async function() {
        const item = JSON.parse(JSON.stringify(global.item));
        ${code}
      })()
    `);

    try {
      const result = await script.run(context, { timeout: 5000 });
      return result;
    } finally {
      isolate.dispose();
    }
  }
}
