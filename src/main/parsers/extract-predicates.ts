import {Token} from './base-parser';
import {concat, head, tail} from 'ramda';
/**
 * Created by dennis on 01/12/2016.
 */

export default function extractPredicates(input: string, acc: Token[] = []): Token[] {


  // Split on Colons
  const list = input.slice(input.indexOf(':'));
  let predicates = [];



  // function extract(inp: string, accu: string[]) {
  //   const match = inp.match(/\s*(\S+)\s?:\s?((".+")|(\S+))\s*/)[1];
  //   if (!match) return accu;
  //   const predicate = match[1];
  //   const rest = match[2];
  //   const text = rest.match(/(['"])((?:(?!\1).)*)\1/);
  // }

  // Split on first color
  // const firstHalf = input.substring(0, input.indexOf(':'));
  // const secondHalf = input.slice(input.indexOf(':') + 1);
  // Extract predicate



  // Extract text

  // console.log(input);
  // const quotes = /(['"])((?:(?!\1).)*)\1/;
  //
  const matches = input.match(/\S+\s?:\s?(['"])((?:(?!\1).)+)\1|(\S+\s?:\s?[\w\-\_]+)/g);
  console.log(`Matches: ${matches}\n\n`);
  if (!matches) return acc;

  const extract = (match, offset) => {
    const str = match.trim();
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
