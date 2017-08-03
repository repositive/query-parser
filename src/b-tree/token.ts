import {is, pipe, view, lensProp, allPass, equals} from 'ramda';
import { Node, isNode } from './node';
import { v4 as uuid } from 'uuid';

export interface Token extends Node {
  _type: 'token';
  value: string;
}

const _type = lensProp('_type');
const _tokenTypeCheck = pipe(view(_type), equals('token'));
const _value = lensProp('value');
const _tokenValueCheck = pipe(view(_value), is(String));

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
