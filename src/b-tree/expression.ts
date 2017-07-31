import {v4 as uuid} from 'uuid';
import {isNode, _type, Node} from './node';
import {__, merge, equals, lensProp, view, allPass, contains, is, pipe, append, concat} from 'ramda';
import { value } from './token';

export type ExpressionOperator = 'AND' | 'OR';

export const isExpressionOperator = allPass([
  is(String),
  contains(__, ['AND', 'OR']) as any
]) as (o: any) => o is ExpressionOperator;

// expression , negation, token, filter, existence
export interface Expression<L extends Node, R extends Node> extends Node {
  _type: 'expression';
  value: ExpressionOperator;
  left: L;
  right: R;
}


export const _expressionTypeCheck = pipe(view(_type), equals('expression'));
export const _expressionValueCheck = pipe(view(value), isExpressionOperator);
export const left = lensProp('left');
export const _expressionLeftCheck = pipe(view(left), isNode);
export const right = lensProp('right');
export const _expressionRightCheck = pipe(view(right), isNode);
export const isExpression = function(o: any, l: any = isNode, r: any = isNode) {
  return allPass([
    isNode,
    _expressionTypeCheck,
    _expressionValueCheck,
    pipe(view(right), r),
    pipe(view(left), l)
  ])(o);
} as <L extends Node, R extends Node>(o: any, l?: (o: any) => o is L, r?: (o: any) => o is R) => o is Expression<L, R>;


export function fold<O>(node: Node, f: (node: Node, l?: O, r?: O) => O, acc: O = undefined): O {
  if (isExpression(node)) {
    return f(node, fold(node.left, f, acc), fold(node.right, f, acc));
  } else {
    return f(node, acc, acc);
  }
}

export function mapLeafs(node: Node, f: (leaf: Node) => Node): Node {
  if (isExpression(node)) {
    return merge(node, {
      _id: uuid(),
      left: mapLeafs(node.left, f),
      right: mapLeafs(node.right, f)
    });
  } else {
    return f(node);
  }
}

export function filter(node: Node, f: (val: Node) => boolean): Node[] {
  return fold(node, (val, l, r) => {
    const acc = concat(l, r);
    if (f(val)) {
      return append(val, acc);
    } else {
      return acc;
    }
  }, []);
}

export function depth(node: Node): number {
  return fold(node, (v, l, r) => {
    return 1 + l + r;
  }, 0);
}
