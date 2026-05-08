export class ExpressionEngine {
  static evaluate(expression: string, context: any): any {
    if (!expression.startsWith('{{') || !expression.endsWith('}}')) {
      return expression;
    }

    const code = expression.slice(2, -2).trim();
    // Supporting $node["name"].json.field
    // We'll use a safer evaluation or a simple regex-based replacement for this MVP
    try {
      const func = new Function('$node', `return ${code}`);
      return func(context.results);
    } catch (e) {
      console.error('Expression evaluation error', e);
      return expression;
    }
  }
}
