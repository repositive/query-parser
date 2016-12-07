import { BTreeLeaf, BBTree, Filter } from "../b-exp-tree";
export declare function getPath(tree: BBTree | BTreeLeaf, id: string, acc?: string[]): any;
export declare function removeNodeByID(tree: BBTree | BTreeLeaf, id: string): BBTree | BTreeLeaf;
export declare function getFilters(tree: BBTree | BTreeLeaf): Filter[];
export declare function removeFilter(tree: BBTree | BTreeLeaf, predicate: string, text: string): BBTree | BTreeLeaf;
export declare function addFilter(tree: BBTree | BTreeLeaf, predicate: string, text: string): BBTree | BTreeLeaf;
