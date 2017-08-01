import { Node } from './b-tree';
import { v4 as uuid } from 'uuid';

export function parse<N extends Node | {}>(str: string): N;
