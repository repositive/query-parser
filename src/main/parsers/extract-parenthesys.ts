import {head, tail as _tail, concat} from 'ramda';
import {Token} from './base-parser';

const tail: any = _tail;

function extractParenthesysContent(input: string, acc: string = ''): string {
  const h = head(input);
  if (h === '') {
    throw new Error(`No closing parenthesys in ${input}`);
  }
  else if (h === ')') {

    return acc;
  }
  else if (h === '(') {
    const nested = extractParenthesysContent(tail(input));
    return extractParenthesysContent(input.substring(nested.length + 1), acc + `(${nested})`);
  }
  else {
    return extractParenthesysContent(tail(input), acc + h);
  }
}

function extractParenthesysGroups(input: string, groups: string[] = []): string[] {
  if (input) {
    const start = input.indexOf('(');
    if (start !== -1) {
      const next = extractParenthesysContent(input.substring(start + 1));
      return extractParenthesysGroups(input.substring(start + next.length + 1), concat(groups, [next]));
    }
    else {
      return groups;
    }
  }
  else {
    return groups;
  }
}

export default function extractParenthesys(input: string, acc: Token[] = []): Token[] {
  const groups = extractParenthesysGroups(input);
  return concat(acc, groups.map(g => {
    const from = input.indexOf(`(${g})`);
    return <Token> {
      type: 'group',
      from,
      to: from + g.length + 2,
      term: g
    };
  }));
}
