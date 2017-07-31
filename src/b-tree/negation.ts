import { Node, _type, isNode } from './node';
import { Token, value } from './token';
import {pipe, equals, view, allPass} from 'ramda';

export const _negationTypeCheck = pipe(view(_type), equals('negation'));
export const _negationValueCheck = pipe(view(value), isNode);

export interface Negation<T extends Node> extends Node {
  _type: 'negation';
  value: T;
}

export const isNegation = function (o: any, f: ((o: any) => boolean) = isNode) {
  return allPass([
    isNode,
    _negationTypeCheck,
    pipe(view(value), f)
  ])(o);
} as <T extends Node> (o: any, f?: (o: any) => o is T) => o is Negation<T>;
