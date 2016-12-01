import {head, tail, flatten} from 'ramda';
import {BTree, SearchNode} from '../b-tree';
import {Token} from './base-parser';

interface Range {
  from: number;
  to: number;
}

function isContained(container: Range, contained: Range) {
  return container.from <= contained.from && container.to >= container.to;
}

function rangeSplitter(input: Range[], split: Range[]): Range[] {

  const s = head(split);

  if (s) {
    const newInput = flatten(input.map(r => {
      if (isContained(r, s)) {
        return [{from: r.from, to: s.from}, {from: s.to, to: r.to}].filter(rng => rng.from !== rng.to);
      }
    }));
    return rangeSplitter(newInput, tail(split));
  }
  else {
    return input;
  }
}

export function tokenStripper(input: string, tokens: Token[]): string[] {

  const inputRange: Range = {from: 0, to: input.length};

  const ranges = rangeSplitter([inputRange], tokens);

  return ranges.map(r => {
    return input.substring(r.from, r.to);
  }).filter(str => str !== '' && str !== ' ');
}

export function parseString(input: string, defOperator= 'AND'): BTree<SearchNode> {
  return {value: {text: 'cancer'}};
}
