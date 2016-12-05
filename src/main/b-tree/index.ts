import {v4 as uuid} from 'uuid';

export interface BTree<T> {
  value: T;
  left?: BTree<T>;
  right?: BTree<T>;
}

export function fold<T, R>(f: (R, T) => R, tree: BTree<T>, acc: R): R {
  if (!tree) return acc;
  const newAcc = f(acc, tree.value);
  return fold(f, tree.right, fold(f, tree.left, newAcc));
}

export function map<T, R>(f: (T) => R, tree: BTree<T>): BTree<R> {
  if (!tree) return null;
  const newValue = f(tree.value);
  const left = map(f, tree.left);
  const right = map(f, tree.right);
  let result = <BTree<R>> {};
  result.value = newValue;
  if (left) result.left = left;
  if (right) result.right = right;
  return result;
}

export default class BTreeImp<T> implements BTree<T> {
  _id: string;
  value: T;
  left: BTreeImp<T>;
  right: BTreeImp<T>;

  constructor(value: T, l?: BTree<T>, r?: BTree<T>) {
    this._id = uuid();
    this.value = value;
    this.left = l ? BTreeImp.fromJS(l) : null;
    this.right = r ? BTreeImp.fromJS(r) : null;
    Object.freeze(this);
  }

  fold<R>(f: (R, T) => R, acc: R): R {
    return fold(f, this, acc);
  }

  map<R>(f: (T) => R): BTree<R> {
    return map(f, this);
  }

  static fromJS<T>(o: BTree<T>): BTreeImp<T> {
    return o instanceof BTreeImp ? o : new BTreeImp(o.value, o.left, o.right);
  }
}
