
export interface BTree<T> {
  value: T;
  left?: BTree<T>;
  right?: BTree<T>;
}

export default class BTreeImp<T> {
  value: T;
  left: BTreeImp<T>;
  right: BTreeImp<T>;

  constructor(value: T, l?: BTree<T>, r?: BTree<T>) {
    this.value = value;
    this.left = l ? BTreeImp.fromJS(l) : null;
    this.right = r ? BTreeImp.fromJS(r) : null;
  }

  static fromJS<T>(o: BTree<T>): BTreeImp<T> {
    return o instanceof BTreeImp ? o : new BTreeImp(o.value, o.left, o.right);
  }
}
