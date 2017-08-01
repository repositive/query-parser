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
