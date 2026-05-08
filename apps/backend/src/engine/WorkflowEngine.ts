export interface INode {
  execute(input: any, context: any): Promise<any>;
}

export interface IWorkflowData {
  nodes: {
    id: string;
    name: string; // User-friendly name for expressions
    type: string;
    parameters: any;
  }[];
  connections: {
    from: string;
    to: string;
    outputIndex?: string; // 'true' or 'false' for If nodes
  }[];
}

export class WorkflowEngine {
  async executeWorkflow(workflow: IWorkflowData, initialInput: any = {}) {
    const results: Record<string, any> = {}; // map node name/id to results
    const nodeMap = new Map(workflow.nodes.map(n => [n.id, n]));

    // Find start nodes
    let queue = workflow.nodes.filter(n => n.type === 'start').map(n => ({ node: n, input: initialInput }));

    while (queue.length > 0) {
      const { node, input } = queue.shift()!;

      const nodeInstance = await this.loadNode(node.type, node.parameters);
      const output = await nodeInstance.execute(input, { results });

      // Store results by both ID and Name for expression engine access
      results[node.id] = output;
      results[node.name] = output;

      // Determine next nodes based on connections and possible branching
      const branch = output && output.__branch;
      const outgoing = workflow.connections.filter(c => c.from === node.id);

      for (const conn of outgoing) {
        // If the connection specifies an outputIndex, it must match the node's branch result
        if (conn.outputIndex && conn.outputIndex !== branch) {
          continue;
        }

        const nextNode = nodeMap.get(conn.to);
        if (nextNode) {
          queue.push({ node: nextNode, input: output });
        }
      }
    }
    return results;
  }

  private async loadNode(type: string, parameters: any): Promise<INode> {
    const nodeClass = (await import(`./nodes/${type}`)).default;
    return new nodeClass(parameters);
  }
}
