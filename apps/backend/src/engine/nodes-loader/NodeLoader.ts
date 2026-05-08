import * as path from 'path';

export class NodeLoader {
  // Security fix: Disabled runtime NPM installation via execSync to prevent command injection.
  // In a production system, this should be handled via a secure, sandboxed process
  // or a pre-defined list of allowed packages.
  static installNodePackage(packageName: string) {
    throw new Error('Runtime node package installation is disabled for security reasons.');
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
