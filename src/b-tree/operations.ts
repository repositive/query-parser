import { is, max, append, concat, merge } from 'ramda';
import { v4 as uuid } from 'uuid';
import { isAND, isOR, isNOT, and, or, not } from './expression';
import { Predicate, isPredicate } from './predicate';
import { isNode, Node } from './node';

export function fold<O>(node: Node, f: (node: Node, l?: O, r?: O, parent?: Node) => O, acc: O = undefined, parent: Node = undefined): O {
  if (isAND(node) || isOR(node)) {
    return f(node, fold(node.left, f, acc, node), fold(node.right, f, acc, node), parent);
  } else if (isNOT(node)) {
    return f(node, fold(node.negated, f, acc, node), acc, parent);
  } else {
    return f(node, acc, acc, parent);
  }
}

export function mapLeafs(node: Node, f: (leaf: Node) => Node): Node {
  if (isAND(node) || isOR(node)) {
    return merge(node, {
      _id: uuid(),
      left: mapLeafs(node.left, f),
      right: mapLeafs(node.right, f)
    });
  } else {
    return f(node);
  }
}

export function filter<N extends Node>(node: Node, f: (val: Node) => boolean): N[] {
  return <N[]> fold(node, (val, l, r) => {
    const acc = concat(l, r);
    if (f(val)) {
      return append(val, acc);
    } else {
      return acc;
    }
  }, []);
}

export function weight(node: Node): number {
  return fold(node, (v, l, r) => {
    return 1 + l + r;
  }, 0);
}

export function depth(node: Node): number {
  return fold(node, (v, l, r) => {
    return 1 + <number>max(l, r);
  }, 0);
}

export function remove(node: Node, target: Node | string): Node | undefined {
  const id = isNode(target) ? target._id : target;

  if (node && node._id === id) {
    return undefined;
  } else if (isAND(node) || isOR(node)) {
    const left = remove(node.left, target);
    const right = remove(node.right, target);
    if (isNode(left) && isNode(right)) {
      if (left._id === node.left._id && right._id === node.right._id) {
        return node;
      } else {
        const exp: any = node._type === 'AND' ? and : or;
        return exp({left, right});
      }
    } else {
      return left || right;
    }
  } else if(isNOT(node)) {
    const negated = remove(node.negated, target);
    if (isNode(negated)) {
      if (negated._id === node.negated._id) {
        return node;
      } else {
        return not(negated);
      }
    } else {
      return undefined;
    }
  } else {
    return node;
  }
}

export function path(node: Node, target: Node | string): Node[] {
  const id = isNode(target) ? target._id : target;

  return fold(node, (val, l, r) => {
    const acc = concat(l, r);
    if (acc.length > 0) {
      return append(val, acc);
    } else if (val._id === id) {
      return append(val, acc);
    } else {
      return acc;
    }
  }, []);
}

export function replace({on, target, replacement}: {on: Node, target: Node, replacement: Node}) {
  return fold(on, (n, l: Node, r: Node) => {
    if (n._id === target._id) {
      return replacement;
    } else if(isAND(n) || isOR(n)) {
      if (n.left._id === l._id && n.right._id === r._id) {
        return n;
      } else {
        const expression: (o: {left: Node, right: Node}) => Node = (isAND(n) ? and : or);
        return expression({
          left: l,
          right: r
        });
      }
    } else if (isNOT(n)) {
      if (n.negated._id === l._id) {
        return n;
      } else {
        return not(l);
      }
    } else {
      return n;
    }
  });
}
