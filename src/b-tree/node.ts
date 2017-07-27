import {is, pipe, lensProp, allPass} from 'ramda';

export interface Node {
  _id: string;
  _type: string;
}

const isObj = is(Object) as (o: any) => o is Object;

const _id = pipe(lensProp('_id'), is(String));
const _type = pipe(lensProp('_type'), is(String));
export const isNode = allPass([
  isObj,
  _id,
  _type
]) as (o: any) => o is Node;

