import { Node, _type, isNode } from './node';
import { Token, value } from './token';
import {pipe, equals, view, allPass} from 'ramda';

export const _negationTypeCheck = pipe(view(_type), equals('negation'));
export const _negationValueCheck = pipe(view(value), isNode);

export interface Negation extends Node {
  _type: 'negation';
  value: Token;
}

export const isNegation = allPass([
  isNode,
  _negationTypeCheck,
  _negationValueCheck
]) as (o: any) => o is Negation;
