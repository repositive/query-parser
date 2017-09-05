import {is, pipe, view, lensProp, allPass, ifElse, identity} from 'ramda';

const isObj = is(Object) as (o: any) => o is Object;

export interface NaturalNode {
  _original: string;
}

const _natural = lensProp('_natural');
const _original = lensProp('_original');
export const isNaturalNode = allPass([
  isObj,
  pipe(view(_original), is(String))
]) as (o: any) => o is NaturalNode;

export interface _Node {
  _id: string;
  _type: any;
}

export interface Node extends Readonly<_Node & NaturalNode> {}

const _id = lensProp('_id');
const _type = lensProp('_type');

export const isNode = allPass([
  isObj,
  pipe(view(_id), is(String)),
  pipe(view(_type), is(String)),
  pipe(view(_original), ifElse(identity, is(String), () => true))
]) as (o: any) => o is Node;
