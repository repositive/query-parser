import { isNode, Node } from './node';
import { __, allPass, contains, is, pipe, view, equals, lensProp} from 'ramda';
import { isToken, Token } from './token';
import { v4 as uuid } from 'uuid';

export type ComparativeOperator = '==' | '!' | '=' | '<' | '>' | '<=' | '>=';

const isComparativeOperator = allPass([
  is(String),
  contains(__, ['==', '!', '=', '<', '>', '<=', '>=']) as any
]) as (o: any) => o is ComparativeOperator;

export interface Predicate extends Node {
  _type: 'predicate';
  relation: ComparativeOperator;
  key: string;
  value: string;
}

const _type = lensProp('_type');
const _value = lensProp('value');
const _filterTypeCheck = pipe(view(_type), equals('predicate'));
const _relation = lensProp('relation');
const _filterRelationCheck = pipe(view(_relation), isComparativeOperator);
const _key = lensProp('key');
const _filterPredicateCheck = pipe(view(_key), is(String));
const _filterValueCheck = pipe(view(_value), is(String));

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
  return Object.freeze({
    _id: uuid(),
    _type: 'predicate' as 'predicate',
    key,
    relation,
    value
  });
}
