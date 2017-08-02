
import { isExpression, Node, isToken, isPredicate, isNegation } from '../b-tree';

const expressions = {
  AND: 'must',
  OR: 'should'
};

const comparison = {
  '>': 'gt',
  '<': 'lt',
  '>=': 'gte',
  '<=': 'lte'
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
          [expressions[_tree.value]]: children
        }
      };
    } else if (isNegation(_tree)) {
      return {
        bool: {
          'must_not': build(_tree.value)
        }
      };
    } else if(isPredicate(_tree) && comparison[_tree.relation]) {
      return {
        range: {
          [_tree.key]: {
            [comparison[_tree.relation]]: _tree.value
          }
        }
      };
    } else if(isPredicate(_tree) && _tree.relation === '=') {
      const type = /\s/.test(_tree.value) ? 'match_phrase' : 'match';
      return {
        [type]: {
          [_tree.key]: _tree.value
        }
      };
    } else if (isPredicate(_tree) && _tree.relation === '==') {
      return {
        'term': {
          [_tree.key]: _tree.value
        }
      };
    } else if (isPredicate(_tree) && _tree.relation === '!') {
      const type = /\s/.test(_tree.value) ? 'match_phrase' : 'match';
      return {
        bool: {
          'must_not': {
            [type]: {
              [_tree.key]: _tree.value
            }
          }
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
