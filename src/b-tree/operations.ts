import { is, max, append, concat, merge } from 'ramda';
import { v4 as uuid } from 'uuid';
import { isExpression } from './expression';
import { Predicate, isPredicate } from './predicate';
import { isNode, Node } from './node';

export function fold<O>(node: Node, f: (node: Node, l?: O, r?: O) => O, acc: O = undefined): O {
  if (isExpression(node)) {
    return f(node, fold(node.left, f, acc), fold(node.right, f, acc));
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

export function removeNode(node: Node, target: Node | string): Node | undefined {
  const id = isNode(target) ? target._id : target;

  console.log(id);
  if (node && node._id === id) {
    return undefined;
  } else if (isExpression(node)) {
    const newNode: any = {
      ...node,
      left: removeNode(node.left, target),
      right: removeNode(node.right, target)
    };

    console.log(newNode);
    if (isExpression(newNode)) {
      return newNode;
    } else {
      return newNode.left || newNode.right;
    }
  } else {
    return node;
  }
}
