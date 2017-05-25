import {Token} from './base-parser';
import {append} from 'ramda';
/**
 * Created by dennis on 01/12/2016.
 */

export default function extractPredicates(input: string, acc: Token[] = []): Token[] {

  const matches = input.match(/\S+\s?:\s?(['"])((?:(?!\1).)+)\1|(\S+\s?:\s?[\w\-\_]+)/g);
  if (!matches) return acc;

  const extract = (matches, string, offset = 0, acc: Token[] = []) => {
    const match = matches[0];
    if (!match) return acc;
    const str = match.trim();
    const temp = str.split(':');
    return extract(matches.slice(1),
      string.slice(match.length),
      offset + match.length,
      append(<Token> {
      type: 'filter',
      from: string.indexOf(str) + offset,
      to: string.indexOf(str) + str.length + offset,
      term: temp[1].trim().replace(/\"/g, ''),
      predicate: temp[0].trim()
    }, acc));
  };

  return extract(matches, input);
}
