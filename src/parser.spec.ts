
import * as test from 'tape';
import { Test } from 'tape';
import {isNode, isToken, isNOT, isExpression, weight, Node, Token, Predicate, isPredicate} from './b-tree';
import {parse} from './parser';
import * as csvParse from 'csv-parse';
import {readFileSync} from 'fs';

test('Parser', (t: Test) => {
  t.deepEquals(parse(''), undefined, 'Parses empty string to undefined');

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
  t.ok(isNOT(parse('not lung')), 'Negation returns true for "not lung"');

  // Predicate
  t.ok(isPredicate(parse('tissue:lung')), 'isPredicate returns true for "tissue:lung"');
  t.equals((parse('tissue:lung') as Predicate).relation, '=', 'Implicit equals works');
  t.ok(isPredicate(parse('tissue:=lung')), 'isPredicate returns true for "tissue:=lung"');
  t.equals((parse('tissue:=lung') as Predicate).relation, '=', 'Expclicit equals works');
  t.ok(isPredicate(parse('tissue:<lung')), 'isPredicate returns true for "tissue:<lung"');
  t.equals((parse('tissue:<lung') as Predicate).relation, '<', 'Less than works');
  t.ok(isPredicate(parse('tissue:>lung')), 'isPredicate returns true for "tissue:>lung"');
  t.equals((parse('tissue:>lung') as Predicate).relation, '>', 'Greater than works');
  t.ok(isPredicate(parse('tissue:<=lung')), 'isPredicate returns true for "tissue:<=lung"');
  t.equals((parse('tissue:<=lung') as Predicate).relation, '<=', 'Less than equals works');
  t.ok(isPredicate(parse('tissue:>=lung')), 'isPredicate returns true for "tissue:>=lung"');
  t.equals((parse('tissue:>=lung') as Predicate).relation, '>=', 'Greater than equals works');
  t.ok(isPredicate(parse('tissue:!lung')), 'isPredicate returns true for "tissue:!lung"');
  t.equals((parse('tissue:!lung') as Predicate).relation, '!', 'Not equals works');
  t.ok(isPredicate(parse('tissue:==lung')), 'isPredicate returns true for "tissue:==lung"');
  t.equals((parse('tissue:==lung') as Predicate).relation, '==', 'Exact works');

  t.end();
});

test('Parser based on platform queries', (t: Test) => {

  const file = readFileSync('./searches.csv');
  const records = csvParse(file.toString(), { comment: '#', skip_empty_lines: true });
  let total = 0;
  let crashes = 0;

  records.on('data', d => {
    const query = d[0];
    if (!/[\[\]=\*]/.test(query)) {
      total++;
      try {
        parse(query);
        t.ok(true, `Parses ${query}`);
      } catch (e) {
        crashes++;
        t.notOk(true, `Breaks on ${query} :: ${e.message}`);
      }
    }
  });

  records.on('end', d => {
    console.log(`\n\n###################### Test ended! ######################\n`);
    console.log(`Total: ${total}\nCrashed: ${crashes}\n`);
    console.log('###########################################################\n\n');
    t.end();
  });
});
