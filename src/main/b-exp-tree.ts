import {BTree} from './b-tree';

export type BooleanOperator = 'AND' | 'OR' | 'NOT';

export function isBooleanOperator(o: any): o is BooleanOperator {
    return typeof o === 'string' &&
    ['AND', 'OR', 'NOT'].indexOf(o) !== -1;
}

export interface Term {
  _id?: string;
  text: string;
}

export function isTerm(o: any): o is Term {
  return typeof o === 'object' &&
    typeof o.text === 'string';
}

export interface Filter {
  _id?: string;
  predicate: string;
  text: string;
}

export function isFilter(o: any): o is Filter {
  return typeof o === 'object' &&
    typeof o.text === 'string' &&
    typeof o.predicate === 'string';
}

export type BTreeLeaf = Term | Filter;

export interface BBTree extends BTree<BooleanOperator, BTreeLeaf> {
  _id?: string;
}

export type SearchNode = Term | BooleanOperator | Filter;
