import { execSync } from 'child_process';
import * as path from 'path';

export class NodeLoader {
  static installNodePackage(packageName: string) {
    const nodesDir = path.join(__dirname, '../nodes');
    execSync(`npm install ${packageName}`, { cwd: nodesDir });
  }

  static async loadNode(type: string) {
    // Check if it's a built-in node
    try {
      const node = await import(`../nodes/${type}`);
      return node.default;
    } catch (e) {
      // If not built-in, try to load from node_modules (simulating dynamic loading)
      try {
        const node = await import(type);
        return node.default;
      } catch (err) {
        throw new Error(`Node ${type} not found`);
      }
    }
  }
}
