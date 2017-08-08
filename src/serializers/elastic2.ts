import { ifElse } from 'ramda';
import { isAND, isOR, isNOT, Node, isToken, isPredicate} from '../b-tree';

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

export function toElastic2(tree?: Node): any {

  function build(_tree?: Node): any {

    // 1. Value is filter or text
    if (isAND(_tree) || isOR(_tree)) {
      const children = [];
      const left = build(_tree.left);
      const right = build(_tree.right);
      if (left) children.push(left);
      if (right) children.push(right);
      return {
        bool: {
          [expressions[_tree._type]]: children
        }
      };
    } else if (isNOT(_tree)) {
      return {
        bool: {
          'must_not': build(_tree.negated)
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
      const spaceIndex = _tree.value.indexOf(' ');
      const wildcardIndex = _tree.value.indexOf('*');
      if (spaceIndex === -1 && wildcardIndex > 0) {
        return {
          prefix: {
            [_tree.key]: _tree.value.substring(0, _tree.value.length -1)
          }
        };
      } else if (spaceIndex === -1 && wildcardIndex === 0) {
        return {
          exists: {
            field: _tree.key
          }
        };
      } else {
        const type = spaceIndex > -1 ? 'match_phrase' : 'match';
        return {
          [type]: {
            [_tree.key]: _tree.value
          }
        };
      }
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
      const spaceIndex = _tree.value.indexOf(' ');
      const wildcardIndex = _tree.value.indexOf('*');

      const query: any = ifElse(
        () => spaceIndex > 0,
        () => ({match_phrase: {_all: _tree.value}}),
        ifElse(
          () => wildcardIndex > 0,
          () => ({prefix: {_all: _tree.value.substring(0, _tree.value.length - 1)}}),
          () => ({match: {_all: _tree.value}})
        )
      );

      return query();
    } else {
      return undefined;
    }

  }

  let q = build(tree);
  if (!q) q = { 'match_all': {} };
  return { query: q };
}
