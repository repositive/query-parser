import {parseString, toElasticQuery } from './index';
import {BTree} from "./b-tree/index";
import {BooleanOperator, BTreeLeaf, Term} from "./b-exp-tree";

const str = 'title:"breast cancer"';
const tree = parseString(str);
console.log(tree);
const esquery = toElasticQuery(<BTree<BooleanOperator, BTreeLeaf>> tree);
console.log(esquery);
