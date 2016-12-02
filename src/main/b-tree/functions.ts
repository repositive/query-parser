import {BTree} from "./index";

export function fold<T, R>(f: (R, T) => R, tree: BTree<T>, acc: R) {
  if (!tree) return acc;
  const newAcc = f(acc, tree.value);
  return fold(f, tree.right, fold(f, tree.left, newAcc));
}

export function map<T>(f: (T) => T, tree: BTree<T>): BTree<T> {
  if (!tree) return null;
  const newValue = f(tree.value);
  const left = map(f, tree.left);
  const right = map(f, tree.right);
  let result = <BTree<T>> {};
  result.value = newValue;
  if (left) result.left = left;
  if (right) result.right = right;
  return result;
}
