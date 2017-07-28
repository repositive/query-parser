import {is, pipe, view, lensProp, allPass} from 'ramda';

export interface Node {
  _id: string;
  _type: string;
}

export const isObj = is(Object) as (o: any) => o is Object;

export const _id = lensProp('_id');
export const _nodeIdCheck = pipe(view(_id), is(String));
export const _type = lensProp('_type') as any;
export const _nodeTypeCheck = pipe(view(_type), is(String));
export const isNode = allPass([
  isObj,
  _nodeIdCheck,
  _nodeTypeCheck
]) as (o: any) => o is Node;

