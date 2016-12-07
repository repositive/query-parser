import { BTree } from '../b-tree/index';
import { BooleanOperator, BTreeLeaf } from '../b-exp-tree';
export declare function filterExists(predicate: string, term: string, tree: BTree<BooleanOperator, BTreeLeaf>): Boolean;
export declare function predicateExists(predicate: string, tree: BTree<BooleanOperator, BTreeLeaf>): Boolean;
export declare function insertFilter(predicate: string, term: string, tree: BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf): BTree<BooleanOperator, BTreeLeaf>;
