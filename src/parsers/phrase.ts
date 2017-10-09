import { Node } from '../b-tree';
import { v4 as uuid } from 'uuid';

export interface Position {
  from: number;
  to: number;
}

export interface PhraseToken {
  id: string;
  type: 'token';
  position: Position;
  text: string;
}

export interface Phrase {
  id: string;
  type: 'phrase';
  position: Position;
  text: string;
  tokens: PhraseToken[];
}

export interface QuotedPhrase {
  id: string;
  type: 'quoted_phrase';
  position: Position;
  text: string;
}

export interface Relation {
  id: string;
  text: string;
  value: string;
  position: Position;
}

export interface PhrasePredicate {
  id: string;
  type: 'predicate';
  position: Position;
  target: PhraseToken;
  relation: Relation;
  value: PhraseToken | QuotedPhrase;
}

export function parse(str: string): Array<Phrase | QuotedPhrase | PhrasePredicate> {
  return [];
  // Implemented in JS
}
