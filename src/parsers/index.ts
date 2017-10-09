import { parse as parseNatural } from './natural';
import * as phrase from './phrase';
export const fromNatural = parseNatural;
export const fromPhrase = phrase.parse;

export * from './phrase';
export * from './natural-operations';
