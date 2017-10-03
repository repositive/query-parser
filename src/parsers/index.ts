import { parse as parseNatural } from './natural';
import { parse as parsePhrase } from './phrase';
export const fromNatural = parseNatural;
export const fromPhrase = parsePhrase;
export * from './natural-operations';
