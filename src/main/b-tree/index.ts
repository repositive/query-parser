import {v4 as uuid} from 'uuid';
import {append} from 'ramda';

export interface BTree<O, T> {
  value: O;
  left: BTree<O, T> | T;
  right: BTree<O, T> | T;
}

export function isBTree<O, T>(o: any): o is BTree<O, T> {
  return o &&
    typeof o === 'object' &&
    o.value !== undefined &&
    o.value !== null;
}

export function fold<O, T, R>(tree: BTree<O, T> | T, f: (R, tree: BTree<O, T> | T) => R, acc: R): R {
  if (!tree) return acc;
  if (isBTree(tree)) {
    const newAcc = f(acc, tree);
    return fold(tree.right, f, fold(tree.left, f, newAcc));
  }
  else {
    return f(acc, tree);
  }
}

export function map<O, T, OR, TR>(tree: BTree<O, T> | T, f: (tree: BTree<O,T> | T, left?: BTree<OR,TR> | TR, right?: BTree<OR,TR> | TR) => BTree<OR,TR> | TR): BTree<OR,TR> | TR {
    if (isBTree(tree)) {
      const left = map(tree.left, f);
      const right = map(tree.right, f);
      return f(tree, left, right)
    }
    else {
      return f(tree);
    }
}

export function mapLeafs<O,T>(tree: BTree<O,T> | T, f: (leaf: T) => T): BTree<O,T> | T {
  if (isBTree(tree)) {
  return {
      value: tree.value,
      left: mapLeafs(tree.left, f),
      right: mapLeafs(tree.right, f)
    };
  } else {
    return f(tree);
  }
}

// export function mapPath<O,T>(tree: BTree<O,T> | T, f: (tree: BTree<O,T>) => BTree<O,T>, path: string[]): BTree<O,T> | T {
//   if (path.length === 0) return tree;
// }

// export function getPath<O,T>(tree: )

// export function map<O,T>(f: (tree: BTree<O, T> | T) => BTree<O, T> | T, tree: BTree<O,T> | T): BTree<O, T> | T {
//   return {
//
//   }
// }

export function filter<O, T>(tree: BTree<O, T> | T, f: (val: BTree<O,T> | T) => boolean): (BTree<O, T> | T)[] {
  return fold(tree, (acc, val) => {
    if (f(val)) {
      return append(val, acc);
    }
    else {
      return acc;
    }
  }, []);
}

//export function map<T, R>(f: (T) => R, tree: T): BTree<R, R> {
//  if (!tree) return null;
//  else if (isBTree(tree)) {
//    const newValue = f(tree.value);
//    const left = map(f, tree.left);
//    const right = map(f, tree.right);
//    let result = <BTree<R, R>> {};
//    return result;
//  }
//  else {
//    return f(tree);
//  }
//}


export default class BTreeImp<O, T> implements BTree<O, T> {
  _id: string;
  value: O;
  left: BTreeImp<O, T> | T;
  right: BTreeImp<O, T> | T;

  constructor(value: O, l?: BTree<O, T> | T, r?: BTree<O, T> | T) {
    this._id = uuid();
    this.value = value;
    this.left = isBTree(l) ? BTreeImp.fromJS(l) : l || null;
    this.right = isBTree(r) ? BTreeImp.fromJS(r) : r || null;
    Object.freeze(this);
  }

  fold<R>(f: (R, T) => R, acc: R): R {
    return fold(this, f, acc);
  }

  filter(f: (val: BTree<O,T> | T) => boolean) {
    return filter(this, f);
  }

  //map<R>(f: (T) => R): BTree<R> {
  //  return map(f, this);
  //}

  static fromJS<O, T>(o: BTree<O, T>): BTreeImp<O, T> {
    return o instanceof BTreeImp ? o : new BTreeImp(o.value, o.left, o.right);
  }
}
