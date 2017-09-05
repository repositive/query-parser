import * as test from 'tape';
import { Test } from 'tape';
import { fromNatural, PositionalNode, decorateTreeWithNaturalPositions } from '.';
import { pipe } from 'ramda';
import { filter, Node, toNatural } from '..';

test.only('decorateTreeWithNaturalPositions', (t: Test) => {

  const fromNatPos = pipe(fromNatural, decorateTreeWithNaturalPositions, (n: Node) => filter<PositionalNode>(n, (ns: PositionalNode) => ns._type === 'token' || ns._type === 'predicate'));

  const check = (text: string, leaf: number, from: number, to: number) => {
    const node = fromNatPos(text)[leaf];
    t.equals(node.from, from, `in "${text}" - "${toNatural(node)}" from = ${from}`);
    t.equals(node.to, to, `in "${text}" - "${toNatural(node)}" to = ${to}`);
  };

  check('lung', 0, 0, 3);
  check('lung cancer', 1, 5, 10);
  check('lung not cancer', 1, 9, 14);
  t.end();
});
