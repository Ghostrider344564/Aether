export class ExpressionEngine {
  static evaluate(expression: string, context: any): any {
    if (typeof expression !== 'string' || !expression.startsWith('{{') || !expression.endsWith('}}')) {
      return expression;
    }

    const code = expression.slice(2, -2).trim();

    // In a production system, use a library like 'jsep' or 'expr-eval' to avoid RCE.
    // For this demonstration, we use a restricted function context.
    try {
      // Create a restricted scope for evaluation
      const scope = {
        $node: context.results || {},
        $vars: context.vars || {},
        $json: context.input || {},
      };

      const keys = Object.keys(scope);
      const values = Object.values(scope);

      const fn = new Function(...keys, `return ${code}`);
      return fn(...values);
    } catch (e) {
      console.error('Expression evaluation error', e);
      return expression;
    }
  }
}
