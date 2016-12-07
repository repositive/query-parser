import { BTree } from './b-tree';
export declare type BooleanOperator = 'AND' | 'OR' | 'NOT';
export declare function isBooleanOperator(o: any): o is BooleanOperator;
export interface Term {
    _id?: string;
    text: string;
}
export declare function isTerm(o: any): o is Term;
export interface Filter {
    _id?: string;
    predicate: string;
    text: string;
}
export declare function isFilter(o: any): o is Filter;
export declare type BTreeLeaf = Term | Filter;
export interface BBTree extends BTree<BooleanOperator, BTreeLeaf> {
    _id?: string;
}
export declare type SearchNode = Term | BooleanOperator | Filter;
