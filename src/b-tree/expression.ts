import {v4 as uuid} from 'uuid';
import {isNode, _type} from './node';
import {__, merge, equals, lensProp, view, allPass, contains, is, pipe, append, concat} from 'ramda';

export type BooleanOperator = 'AND' | 'OR' | 'NOT';

export const isExpressionOperator = allPass([
  is(String),
  contains(__, ['AND', 'OR']) as any
]) as (o: any) => o is BooleanOperator

// expression , negation, token, filter, existence
export interface Expression<L extends Node, R extends Node> extends Node {
  _type: 'expression';
  value: BooleanOperator;
  left: L;
  right: R;
}


export const _expressionTypeCheck = pipe(view(_type), equals('expression'));
export const value = lensProp('value');
export const _expressionValueCheck = pipe(view(value), isExpressionOperator);
export const left = lensProp('left');
export const _expressionLeftCheck = pipe(view(left), isNode);
export const right = lensProp('right');
export const _expressionRightCheck = pipe(view(right), isNode);
export const isExpression = allPass([
  isNode,
  _expressionTypeCheck,
  _expressionValueCheck,
  _expressionLeftCheck,
  _expressionRightCheck
]) as (o: any) => o is Expression<Node, Node>


export function fold<O>(node: Node, f: (node: Node, l?: O, r?: O) => O, acc: O): O {
  if (!node) {
    return acc;
  } if (isExpression(node)) {
    return f(node, fold(node.left, f, acc), fold(node.right, f, acc));
  } else {
    return f(node, acc, acc);
  }
}

export function map<O extends Node>(node: Node, f: (tree: Node, left?: Node, right?: Node) => O): O {
  return fold<O>(node, f, null);
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
    }
    else {
      return acc;
    }
  }, []);
}
