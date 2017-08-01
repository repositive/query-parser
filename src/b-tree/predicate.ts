import { isNode, _type, Node } from './node';
import { __, allPass, contains, is, pipe, view, equals, lensProp} from 'ramda';
import { _value, isToken, Token } from './token';
import { v4 as uuid } from 'uuid';

export type ComparativeOperator = '==' | '!' | '=' | '<' | '>' | '<=' | '>=';

export const isComparativeOperator = allPass([
  is(String),
  contains(__, ['==', '!', '=', '<', '>', '<=', '>=']) as any
]) as (o: any) => o is ComparativeOperator;

export interface Predicate extends Node {
  _type: 'predicate';
  relation: ComparativeOperator;
  key: string;
  value: string;
}

export const _filterTypeCheck = pipe(view(_type), equals('predicate'));
export const _relation = lensProp('relation');
export const _filterRelationCheck = pipe(view(_relation), isComparativeOperator);
export const _key = lensProp('key');
export const _filterPredicateCheck = pipe(view(_key), is(String));
export const _filterValueCheck = pipe(view(_value), is(String));

export const isPredicate = allPass([
  isNode,
  _filterTypeCheck,
  _filterRelationCheck,
  _filterPredicateCheck,
  _filterValueCheck
]) as (o: any) => o is Predicate;

export function predicate({
  key,
  relation,
  value
}: {
  key: string,
  relation: ComparativeOperator,
  value: string
}): Predicate {
  return {
    _id: uuid(),
    _type: 'predicate',
    key,
    relation,
    value
  };
}