import { Node, _type, isNode } from './node';
import { Token, _value } from './token';
import {pipe, equals, view, allPass} from 'ramda';
import { v4 as uuid } from 'uuid';

export const _negationTypeCheck = pipe(view(_type), equals('negation'));
export const _negationValueCheck = pipe(view(_value), isNode);

export interface Negation<T extends Node> extends Node {
  _type: 'negation';
  value: T;
}

export const isNegation = function (o: any, f: ((o: any) => boolean) = isNode) {
  return allPass([
    isNode,
    _negationTypeCheck,
    pipe(view(_value), f)
  ])(o);
} as <T extends Node> (o: any, f?: (o: any) => o is T) => o is Negation<T>;

export function negation<T extends Node>(o: T): Negation<T> {
  return {
    _id: uuid(),
    _type: 'negation',
    value: o
  };
}
