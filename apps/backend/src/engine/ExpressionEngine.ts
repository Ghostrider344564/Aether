import { Parser } from 'expr-eval';

export class ExpressionEngine {
  private static parser = new Parser();

  static evaluate(expression: string, context: any): any {
    if (typeof expression !== 'string' || !expression.startsWith('{{') || !expression.endsWith('}}')) {
      return expression;
    }

    const code = expression.slice(2, -2).trim();

    try {
      const scope = {
        $node: context.results || {},
        $vars: context.vars || {},
        $json: context.input || {},
      };

      return this.parser.evaluate(code, scope);
    } catch (e) {
      console.error('Expression evaluation error', e);
      return expression;
    }
  }
}
