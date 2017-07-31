import { isNode, _type, Node } from './node';
import { __, allPass, contains, is, pipe, view, equals, lensProp} from 'ramda';
import { value, isToken, Token } from './token';

export type ComparativeOperator = 'EXACT' | 'NE' | 'EQ' | 'LT' | 'GT' | 'GTE' | 'LTE';

export const isComparativeOperator = allPass([
  is(String),
  contains(__, ['EXACT', 'NE', 'EQ', 'LT', 'GT', 'GTE', 'LTE']) as any
]) as (o: any) => o is ComparativeOperator;

export interface Filter extends Node {
  _type: 'filter';
  relation: ComparativeOperator;
  predicate: string;
  value: Token;
}

export const _filterTypeCheck = pipe(view(_type), equals('filter'));
export const relation = lensProp('relation');
export const _filterRelationCheck = pipe(view(relation), isComparativeOperator);
export const predicate = lensProp('predicate');
export const _filterPredicateCheck = pipe(view(predicate), is(String));
export const _filterValueCheck = pipe(view(value), isToken);

export const isFilter = allPass([
  isNode,
  _filterTypeCheck,
  _filterRelationCheck,
  _filterPredicateCheck,
  _filterValueCheck
]) as (o: any) => o is Filter;
