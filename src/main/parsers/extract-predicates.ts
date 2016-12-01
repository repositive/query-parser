import {Token} from "./base-parser";
import {concat} from 'ramda';
/**
 * Created by dennis on 01/12/2016.
 */

export default function extractPredicates(input:string, acc: Token[] = []): Token[] {

  const matches = input.match(/\s*(\S+)\s?:\s?((\".*\")|(\S+))\s*/g);
  if (!matches) return acc;

  const extract = m => {
    const str = m.trim();
    const temp = str.split(':');
    return <Token> {
      type: 'filter',
      from: input.indexOf(str),
      to: input.indexOf(str) + str.length,
      term: temp[1].trim().replace(/\"/g, ''),
      predicate: temp[0].trim()
    };
  };

  return concat(acc, matches.map(extract));
}