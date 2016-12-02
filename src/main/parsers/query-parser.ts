import {head, tail, flatten, concat} from 'ramda';
import {BTree, SearchNode} from '../b-tree';
import {Token} from './base-parser';

import extractParenthesys from './extract-parenthesys';
import extractPredicates from './extract-predicates';
import extractLooseWords from './extract-loose-words';
import extractExplicitBoolean from './extract-explicit-boolean';
import extractImplicitBoolean from './extract-implicit-boolean';
import extractQuoted from './extract-quoted';
import extractNOT from "./extract-NOT";

const parsers = [
  extractParenthesys,
  extractPredicates,
  extractQuoted,
  extractNOT,
  extractExplicitBoolean,
  extractImplicitBoolean,
  extractLooseWords
];

interface Range {
  from: number;
  to: number;
}

interface StringRange extends Range {
  term: string;
}

function isContained(container: Range, contained: Range) {
  return container.from <= contained.from && container.to >= contained.to;
}

function rangeSplitter(input: Range[], split: Range[]): Range[] {

  const s = head(split);
  if (s) {
    const newInput = input.map(r => {
      if (isContained(r, s)) {
        return [{from: r.from, to: s.from}, {from: s.to, to: r.to}].filter(rng => rng.from !== rng.to);
      }
      else {
        return [r];
      }
    });
    return rangeSplitter(flatten(newInput), tail(split));
  }
  else {
    return input;
  }
}

export function tokenStripper(input: string, tokens: Token[]): StringRange[] {

  const inputRange: Range = {from: 0, to: input.length};

  const ranges = rangeSplitter([inputRange], tokens);

  return ranges.map(r => {
    const str = input.substring(r.from, r.to);
    return {
      from: r.from,
      to: r.to,
      term: str
    };
  }).filter(t => t.term !== '');
}

export function tokenizer(input: string): Token[] {

  return parsers.reduce(
    (tokens, p) => {
      const ranges = tokenStripper(input, tokens);
      return flatten(concat(tokens, ranges.map(r => {
        const newTokens = p(r.term);
        return newTokens.map((t: Token) => {
          t.from += r.from;
          t.to += r.from;
          return t;
        });
      })));
    },
    []
  ).sort((a, b) => {
    return a.from - b.from;
  });
}

export function parseString(input: string, defOperator= 'AND'): BTree<SearchNode> {
  return {value: {text: 'cancer'}};
}
