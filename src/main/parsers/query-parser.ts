import {head, tail, flatten, concat} from 'ramda';
import {BTree, SearchNode, BooleanOperator} from '../b-tree';
import {Token} from './base-parser';

import extractParenthesys from './extract-parenthesys';
import extractPredicates from './extract-predicates';
import extractLooseWords from './extract-loose-words';
import extractExplicitBoolean from './extract-explicit-boolean';
import extractImplicitBoolean from './extract-implicit-boolean';
import extractQuoted from './extract-quoted';
import extractNOT from './extract-NOT';

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

export function treeBuilder(tokens: Token[], tree: BTree<SearchNode> = null): BTree<SearchNode> {
  const f = <Token> head(tokens);
  if (f) {

    const remaining = tail(tokens);
    if (f.type === 'term') {
      return treeBuilder(remaining, {value: {text: f.term}});
    }
    else if (f.type === 'filter') {
      return treeBuilder(remaining, {value: {predicate: f.predicate, text: f.term}});
    }
    else if (f.type === 'not') {
      const nextTerm = head(remaining);
      return treeBuilder(tail(remaining), {
        value: <BooleanOperator> {operator: f.term},
        right: treeBuilder([nextTerm])
      });
    }
    else if (f.type === 'bo') {
      const nextTerm = head(remaining);
      if (nextTerm.type === 'not') {
        const negated = head(tail(remaining));
        return treeBuilder(tail(tail(remaining)), {
          value: <BooleanOperator> {operator: f.term},
          right: {
            value: { operator: 'NOT'},
            right: treeBuilder([negated])
          },
          left: tree
        });
      }
      else {
        return treeBuilder(tail(remaining), {
          value: <BooleanOperator> {operator: f.term},
          right: treeBuilder([nextTerm]),
          left: tree
        });
      }
    }
    else if (f.type === 'group') {
      return treeBuilder(remaining, parseString(f.term));
    }
  }
  else {
    return tree;
  }
}

export function parseString(input: string): BTree<SearchNode> {
  const tokens = tokenizer(input);
  return treeBuilder(tokens);
}
