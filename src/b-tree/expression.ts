import {v4 as uuid} from 'uuid';
import {isNode, _type, Node} from './node';
import {__, merge, equals, lensProp, view, allPass, contains, is, pipe, append, concat} from 'ramda';
import { _value } from './token';

export type ExpressionOperator = 'AND' | 'OR';

export const isExpressionOperator = allPass([
  is(String),
  contains(__, ['AND', 'OR']) as any
]) as (o: any) => o is ExpressionOperator;

export interface Expression<L extends Node, R extends Node> extends Node {
  _type: 'expression';
  value: ExpressionOperator;
  left: L;
  right: R;
}

export const _expressionTypeCheck = pipe(view(_type), equals('expression'));
export const _expressionValueCheck = pipe(view(_value), isExpressionOperator);
export const _left = lensProp('left');
export const _expressionLeftCheck = pipe(view(_left), isNode);
export const _right = lensProp('right');
export const _expressionRightCheck = pipe(view(_right), isNode);
export const isExpression = function(o: any, l: any = isNode, r: any = isNode) {
  return allPass([
    isNode,
    _expressionTypeCheck,
    _expressionValueCheck,
    pipe(view(_right), r),
    pipe(view(_left), l)
  ])(o);
} as <L extends Node, R extends Node>(o: any, l?: (o: any) => o is L, r?: (o: any) => o is R) => o is Expression<L, R>;

export function expression<L extends Node, R extends Node>({
  value,
  left,
  right
}: {
  value: ExpressionOperator,
  left: L,
  right: R
}): Expression<L, R> {
  return {
    _id: uuid(),
    _type: 'expression',
    value,
    left,
    right
  };
}
