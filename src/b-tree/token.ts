import {is, pipe, view, lensProp, allPass, equals} from 'ramda';
import { Node, isNode, _type } from './node';
import { v4 as uuid } from 'uuid';

export interface Token extends Node {
  _type: 'token';
  value: string;
}

export const _tokenTypeCheck = pipe(view(_type), equals('token'));
export const _value = lensProp('value');
export const _tokenValueCheck = pipe(view(_value), is(String));
export const _fuzzy = lensProp('fuzzy');
export const _tokenFuzzyCheck = pipe(view(_fuzzy), is(Boolean));

export const isToken = allPass([
  isNode,
  _tokenTypeCheck,
  _tokenValueCheck
]) as (o: any) => o is Token;

export function token(value: string): Token {
  return {
    _id: uuid(),
    _type: 'token',
    value
  };
}
