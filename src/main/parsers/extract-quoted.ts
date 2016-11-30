import {head, tail as _tail} from 'ramda';
import {Token} from './base-parser';

const tail:any = _tail;

function extractQuotedWord(input: string, acc: string = ''): string {
  const h = head(input);
  if (h === '') {
    throw new Error(`No closing quote in ${acc}`)
  }
  else if(h === '"') {
    return acc;
  }
  else {
    return extractQuotedWord(tail(input), acc + h);
  }
}

function extractQuotedWords(input: string, acc: string[] = []) {
  const h = head(input);
  if (h === '') {
    return acc;
  }
  else if (h === '"') {
    const word = extractQuotedWord(tail(input));
    acc.push(`"${word}"`);
    return extractQuotedWords(input.substring(word.length + 2), acc);
  }
  else {
    return extractQuotedWords(tail(input), acc);
  }
}

export default function extractQuoted(input: string, acc: Token[] = []) {
  const words = extractQuotedWords(input);

  return words.map((w):Token => {
    const from = input.indexOf(w);
    return {
      type: 'term',
      from: from,
      to: from + w.length,
      term: w.replace(/\"/g,'')
    }
  })
}
