import {is, pipe, view, lensProp, allPass, equals} from 'ramda';
import { Node, isNode, _type } from './node';

export interface Token extends Node {
  _type: 'token';
  fuzzy: boolean;
  value: string;
}

export const _tokenTypeCheck = pipe(view(_type), equals('token'));
export const value = lensProp('value');
export const _tokenValueCheck = pipe(view(value), is(String));
export const fuzzy = lensProp('fuzzy');
export const _tokenFuzzyCheck = pipe(view(fuzzy), is(Boolean));

export const isToken = allPass([
  isNode,
  _tokenTypeCheck,
  _tokenValueCheck,
  _tokenFuzzyCheck
]) as (o: any) => o is Token;
