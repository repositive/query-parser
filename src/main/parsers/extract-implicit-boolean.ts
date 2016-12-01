import {append} from 'ramda';
import {Token} from './base-parser';

export default function extractBoolean(input: string, tokens: Token[] = [], i: number = 0): Token[] {
  const next = input.indexOf(' ');
  if (next !== -1) {
    return extractBoolean(input.replace(/\s+/g, ' ').substring(next + 1), append({type: 'bo', from: next + i, to: next + 1 + i, term: 'AND'}, tokens), next + 1 + i);
  }
  else {
    return tokens;
  }
}
