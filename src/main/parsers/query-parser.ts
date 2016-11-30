import {BTree, SearchNode, BooleanOperator, Term, Filter} from '../b-tree';
import {Token, Parser} from './base-parser';


export function parseString(input: string, defOperator='AND'): BTree<SearchNode> {
  return {value: {text: 'cancer'}}
}

