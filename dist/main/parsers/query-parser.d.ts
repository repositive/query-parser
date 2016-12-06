import { BTree } from '../b-tree/index';
import { BTreeLeaf, BooleanOperator } from '../b-exp-tree';
import { Token } from './base-parser';
export interface Range {
    from: number;
    to: number;
}
export interface StringRange extends Range {
    term: string;
}
export declare function tokenStripper(input: string, tokens: Token[]): StringRange[];
export declare function tokenizer(input: string): Token[];
export declare function treeBuilder(tokens: Token[], tree?: BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf): BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf;
export declare function parseString(input: string): BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf;
