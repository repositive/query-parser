import {Token} from './base-parser';
import {concat} from 'ramda';

export default function extractNOT(input: string, tokens: Token[] = [], i: number = 0): Token[] {

  const match = input.match(/(^NOT\s|\sNOT\s)/);

  if (match) {
    const from = match[0].startsWith('N') ? match.index : match.index + 1; // Space in front of NOT -> leave space
    const to = match.index + match[0].length;
    const newTokens = concat(tokens, <Token[]> [{
      type: 'not',
      from: from + i,
      to: to + i,
      term: input.substr(from, 3) // Set explicitly to NOT??
    }]);
    return extractNOT(input.substr(to), newTokens, to + i);
  }
  else {
    return tokens;
  }
}