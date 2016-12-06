import { BTree } from "../b-tree/index";
import { BooleanOperator, BTreeLeaf } from '../b-exp-tree';
/**
 * Created by dennis on 30/11/2016.
 */
export declare function toElasticQuery(tree: BTree<BooleanOperator, BTreeLeaf>): any;
