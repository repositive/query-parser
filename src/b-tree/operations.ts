import { is, max, append, concat, merge } from 'ramda';
import { v4 as uuid } from 'uuid';
import { isExpression, expression } from './expression';
import { Predicate, isPredicate } from './predicate';
import { isNode, Node } from './node';
import { isNegation, negation } from './negation';

export function fold<O>(node: Node, f: (node: Node, l?: O, r?: O) => O, acc: O = undefined): O {
  if (isExpression(node)) {
    return f(node, fold(node.left, f, acc), fold(node.right, f, acc));
  } else if (isNegation(node)) {
    return f(node, fold(node.value, f, acc), acc);
  } else {
    return f(node, acc, acc);
  }
}

export function mapLeafs(node: Node, f: (leaf: Node) => Node): Node {
  if (isExpression(node)) {
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
  } else if (isExpression(node)) {
    const newNode: any = {
      ...node,
      left: remove(node.left, target),
      right: remove(node.right, target)
    };

    if (isExpression(newNode)) {
      return newNode;
    } else {
      return newNode.left || newNode.right;
    }
  } else if(isNegation(node)) {
    const newNode: any = {
      ...node,
      value: remove(node.value, target)
    };
    if (isNegation(newNode)) {
      return newNode;
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
    } else if(isExpression(n)) {
      if (n.left._id === l._id && n.right._id === r._id) {
        return n;
      } else {
        return expression({
          value: n.value,
          left: l,
          right: r
        });
      }
    } else if (isNegation(n)) {
      if (n.value._id === l._id) {
        return n;
      } else {
        return negation(l);
      }
    } else {
      return n;
    }
  });
}
