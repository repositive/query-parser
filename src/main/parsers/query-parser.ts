import {BTree, BinaryOperator, Term, Filter} from '../b-tree';
import {Token, Parser} from './base-parser';


export function parseString(input: string, defOperator='AND'): BTree<BinaryOperator | Term | Filter> {
  return {value: {text: 'cancer'}}
}

