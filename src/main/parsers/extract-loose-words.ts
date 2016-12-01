import {concat} from 'ramda';
import {Token} from './base-parser';

export default function extractLooseWords(input: string, acc: Token[] = []): Token[] {
  return concat(acc, input.split(' ').filter(k => k).map(w => {
    const from = input.indexOf(w);
    return <Token> {
      type: 'term',
      from: from,
      to: from + w.length,
      term: w
    }
  }));
}
