
import * as test from 'tape';
import {isNode, isToken, isNegation, isExpression, weight, Node, Token, Filter, isFilter} from './b-tree';
import {parse} from './parser';

test('Parser', (t) => {
  t.deepEquals(parse(''), {}, 'Parses empty string to empty object');

  // Token
  t.ok(isToken(parse('cancer')), 'The result of "cancer" is a node');
  t.equal(weight(parse('cancer')), 1, 'The weight of "cancer" is 1');
  t.ok(isToken(parse('"breast cancer"')), 'The result of "\"breeast cancer\"" is a token');

  // Expression
  t.ok(isExpression(parse('lung AND cancer')), 'The result of "lung AND cqancer" is an expression');
  t.equal(weight(parse('lung AND cancer')), 3, 'The weight of "lung AND cancer" is 3');
  t.ok(isExpression(parse('lung cancer')), 'The result of "lung cancer" is an expression');
  t.equal(weight(parse('lung cancer')), 3, 'The weight of "lung cancer" is 3');
  t.ok(isExpression(parse('lung OR cancer')), 'The result of "lung OR cancer" is an expression');
  t.equal(weight(parse('lung OR cancer')), 3, 'The weight of "lung OR cancer" is 3');

  // Nesting
  t.equal(weight(parse('this (lung OR cancer)')), 5, 'The weight of "this (lung  OR cancer) is 5"');

  // Negation
  t.ok(isNegation(parse('not lung')), 'Negation returns true for "not lung"');

  // Filter
  t.ok(isFilter(parse('tissue:lung')), 'isFilter returns true for "tissue:lung"');
  t.equals((parse('tissue:lung') as Filter).relation, 'EQ', 'Implicit equals works');
  t.ok(isFilter(parse('tissue:=lung')), 'isFilter returns true for "tissue:=lung"');
  t.equals((parse('tissue:=lung') as Filter).relation, 'EQ', 'Expclicit equals works');
  t.ok(isFilter(parse('tissue:<lung')), 'isFilter returns true for "tissue:<lung"');
  t.equals((parse('tissue:<lung') as Filter).relation, 'LT', 'Less than works');
  t.ok(isFilter(parse('tissue:>lung')), 'isFilter returns true for "tissue:>lung"');
  t.equals((parse('tissue:>lung') as Filter).relation, 'GT', 'Greater than works');
  t.ok(isFilter(parse('tissue:<=lung')), 'isFilter returns true for "tissue:<=lung"');
  t.equals((parse('tissue:<=lung') as Filter).relation, 'LTE', 'Less than equals works');
  t.ok(isFilter(parse('tissue:>=lung')), 'isFilter returns true for "tissue:>=lung"');
  t.equals((parse('tissue:>=lung') as Filter).relation, 'GTE', 'Greater than equals works');
  t.ok(isFilter(parse('tissue:!lung')), 'isFilter returns true for "tissue:!lung"');
  t.equals((parse('tissue:!lung') as Filter).relation, 'NE', 'Not equals works');
  t.ok(isFilter(parse('tissue:==lung')), 'isFilter returns true for "tissue:==lung"');
  t.equals((parse('tissue:==lung') as Filter).relation, 'EXACT', 'Exact works');

  t.end();
});
