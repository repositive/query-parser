import {concat} from 'ramda';
import {Token} from './base-parser';

export default function extractExplicitBoolean(input: string, tokens: Token[] = [], i: number = 0): Token[] {

  const match = input.match(/ AND | OR | NOT /);
  if (match) {
    const from = match.index;
    const to = from + match[0].length;
    const newTokens = concat(tokens, <Token[]> [{
      type: 'bo',
      from: from + i,
      to: to + i,
      term: input.substring(from + 1, to - 1)
    }]);
    return extractExplicitBoolean(input.substring(to), newTokens, to + i);
  }
  else {
    return tokens;
  }
}
