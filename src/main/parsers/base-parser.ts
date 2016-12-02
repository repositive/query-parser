export interface Token {
  type: 'bo' | 'term' | 'filter' | 'group';
  from: number;
  to: number;
  term: string;
  predicate?: string;
}

export function isToken(o: any): o is Token {
  return typeof o === 'object' &&
    [ 'bo',
      'term',
      'filter',
      'group'
    ].indexOf(o.type) !== -1;
}

export type Parser = (input: string, acc: Token[]) => Token[];
