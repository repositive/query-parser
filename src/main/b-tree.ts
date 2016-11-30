export interface BinaryOperator {
  operator: 'AND' | 'OR' | 'NOT';
}

export function isBooleanOperator(o: any) {
  return typeof o === 'object' &&
    typeof o.operator === 'string' &&
    ['AND', 'OR', 'NOT'].indexOf(o.operator) !== -1
}

export interface Term {
  text: string;
}

export function isTerm(o: any): o is Term {
  return typeof o === 'object' &&
    typeof o.text === 'string';
}

export interface Filter {
  predicate: string;
  text: string;
}

export function isFilter(o: any): o is Filter {
  return typeof o === 'object' &&
    typeof o.text === 'string' &&
    typeof o.predicate === 'string';
}

export interface BTree<T> {
  value: T;
  left?: BTree<T>;
  right?: BTree<T>;
}
