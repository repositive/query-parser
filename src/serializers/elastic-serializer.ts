
import { isExpression, Node, isToken, isPredicate, isNegation } from '../b-tree';

const ops = {
  AND: 'must',
  OR: 'should'
};

export function toElasticQuery(tree?: Node): any {

  function build(_tree?: Node): any {

    // 1. Value is filter or text
    if (isExpression(_tree)) {
      const children = [];
      const left = build(_tree.left);
      const right = build(_tree.right);
      if (left) children.push(left);
      if (right) children.push(right);
      return {
        bool: {
          [ops[_tree.value]]: children
        }
      };
    } else if (isNegation(_tree)) {
      return {
        bool: {
          'must_not': [build(_tree.value)]
        }
      };
    } else if(isPredicate(_tree)) {
      const type = /\s/.test(_tree.value) ? 'match_phrase' : 'match';
      return {
        [type]: {
          [_tree.key]: _tree.value
        }
      };
    } else if(isToken(_tree)) {
      const type = /\s/.test(_tree.value) ? 'match_phrase' : 'match';
      return {
        [type]: {
          '_all': _tree.value
        }
      };
    } else {
      return undefined;
    }

  }

  let q = build(tree);
  if (!q) q = { 'match_all': {} };
  return { query: q };
}
