import { BTree } from "../b-tree/index";
import { BooleanOperator, BTreeLeaf } from '../b-exp-tree';
/**
 * Created by dennis on 29/11/2016.
 */
export declare function toBoolString(tree: BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf): string;
