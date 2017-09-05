import {fold, isNaturalNode, Node, isNOT, isAND, isOR} from '../b-tree';
import {toNatural} from '../serializers';

export interface PositionalNode extends Node {
  from: number;
  to: number;
}

export function decorateTreeWithNaturalPositions(tree?: Node | void) {

  // Checks if the inner node is in the key of the parent.
  function nodeIs(key: string, parent: Node, node: Node) {
    return parent && parent[key] && parent[key]._id === node._id;
  }

  // Calculates the position of the current node in the natural string taking in account position of the parent.
  function getPos(parent: PositionalNode, node: Node) {
    const lastIndex = toNatural(node).length -1;
    if (nodeIs('left', parent, node)) {
      return {
        from: parent.from,
        to: parent.from + lastIndex
      };
    } else if(nodeIs('right', parent, node) || nodeIs('negated', parent, node)) {
      return {
        from: parent.to - lastIndex,
        to: parent.to
      };
    } else {
      return {
        from: 0,
        to: lastIndex
      };
    }
  }

  // Decorate the node with the positions in the natural string it represents.
  function decoratePos(node: Node, parent: PositionalNode = undefined): PositionalNode {
    const pos = getPos(parent, node);

    if (isAND(node) || isOR(node)) {
      const posNode = { ...node, ...pos };
      return {
        ...posNode,
        left: decoratePos(node.left, posNode),
        right: decoratePos(node.right, posNode)
      };
    } else if (isNOT(node)) {
      const posNode = { ...node, ...pos };
      return {
        ...posNode,
        negated: decoratePos(node.negated, posNode as PositionalNode)
      } as PositionalNode;
    } else {
      return { ...node, ...pos };
    }
  }

  return tree && decoratePos(tree);
}
