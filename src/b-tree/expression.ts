import {v4 as uuid} from 'uuid';
import {isNode, _type, Node} from './node';
import {__, merge, equals, lensProp, view, allPass, anyPass, contains, is, pipe, append, concat} from 'ramda';
import { _value } from './token';

export type ExpressionOperator = 'AND' | 'OR';

export const isExpressionOperator = allPass([
  is(String),
  contains(__, ['AND', 'OR']) as any
]) as (o: any) => o is ExpressionOperator;

export const _left = lensProp('left');
export const _right = lensProp('right');

export type Check<T> = (o: any) => o is T;
export interface BranchChecks<L, R> {
  isLeft?: Check<L>;
  isRight?: Check<R>;
}

export interface AND<L extends Node, R extends Node> extends Node {
  _type: 'AND';
  left: L;
  right: R;
}

export function isAND<L extends Node, R extends Node>( o: any, checks: BranchChecks<L, R> = {}): o is AND<L, R> {
  const check = {isRight: isNode, isLeft: isNode, ...checks};
  const leftCheck = pipe(view(_left), check.isLeft);
  const rightCheck = pipe(view(_right), check.isRight);
  const typeCheck = pipe(view(_type), equals('AND'));
  return allPass([isNode, typeCheck, leftCheck, rightCheck])(o);
}

export function and<L extends Node, R extends Node>({left, right}: {left: L, right: R}): AND<L, R> {
  return {
    _id: uuid(),
    _type: 'AND',
    left,
    right
  };
}

export interface OR<L extends Node, R extends Node> extends Node {
  _type: 'OR';
  left: L;
  right: R;
}

export function isOR<L extends Node, R extends Node>( o: any, checks: BranchChecks<L, R> = {}): o is OR<L, R> {
  const check = {isRight: isNode, isLeft: isNode, ...checks};
  const leftCheck = pipe(view(_left), check.isLeft);
  const rightCheck = pipe(view(_right), check.isRight);
  const typeCheck = pipe(view(_type), equals('OR'));
  return allPass([isNode, typeCheck, leftCheck, rightCheck])(o);
}

export function or<L extends Node, R extends Node>({left, right}: {left: L, right: R}): OR<L, R> {
  return {
    _id: uuid(),
    _type: 'OR',
    left,
    right
  };
}

export interface NOT<N extends Node> extends Node {
  _type: 'NOT';
  negated: N;
}

export function isNOT<N extends Node>( o: any, checkNegated?: (o: any) => o is N): o is NOT<N> {
  const negated = lensProp('negated');
  const negatedCheck = pipe(view(negated), checkNegated || isNode);
  const typeCheck = pipe(view(_type), equals('NOT'));
  return allPass([isNode, typeCheck, negatedCheck])(o);
}

export function not<N extends Node>(negated: N): NOT<N> {
  return {
    _id: uuid(),
    _type: 'NOT',
    negated
  };
}

export type Expression = AND<Node, Node> | OR<Node, Node> | NOT<Node>;

export function isExpression(o: any): o is Expression {
  return anyPass([isAND, isOR, isNOT])(o);
}
