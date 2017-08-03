import {is, pipe, view, lensProp, allPass} from 'ramda';

export interface Node {
  _id: string;
  _type: string;
}

const isObj = is(Object) as (o: any) => o is Object;

const _id = lensProp('_id');
const _nodeIdCheck = pipe(view(_id), is(String));
const _type = lensProp('_type') as any;
const _nodeTypeCheck = pipe(view(_type), is(String));
export const isNode = allPass([
  isObj,
  _nodeIdCheck,
  _nodeTypeCheck
]) as (o: any) => o is Node;

