export interface BTree<O, T> {
    value: O;
    left: BTree<O, T> | T;
    right: BTree<O, T> | T;
}
export declare function isBTree<O, T>(o: any): o is BTree<O, T>;
export declare function fold<O, T, R>(tree: BTree<O, T> | T, f: (R, tree: O | T) => R, acc: R): R;
export declare function map<O, T, OR, TR>(tree: BTree<O, T> | T, f: (tree: BTree<O, T> | T, left?: BTree<OR, TR> | TR, right?: BTree<OR, TR> | TR) => BTree<OR, TR> | TR): BTree<OR, TR> | TR;
export declare function mapLeafs<O, T>(tree: BTree<O, T> | T, f: (leaf: T) => T): BTree<O, T> | T;
export declare function filter<O, T>(tree: BTree<O, T> | T, f: (val: O | T) => boolean): BTree<O, T>;
export default class BTreeImp<O, T> implements BTree<O, T> {
    _id: string;
    value: O;
    left: BTreeImp<O, T> | T;
    right: BTreeImp<O, T> | T;
    constructor(value: O, l?: BTree<O, T> | T, r?: BTree<O, T> | T);
    fold<R>(f: (R, T) => R, acc: R): R;
    filter(f: (val: O | T) => boolean): BTree<O, T | BTreeImp<O, T>>;
    static fromJS<O, T>(o: BTree<O, T>): BTreeImp<O, T>;
}
