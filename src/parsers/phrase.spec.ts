
import * as test from 'tape';
import { Test } from 'tape';
import {parse} from './phrase';
import * as R from 'ramda';
import * as csvParse from 'csv-parse';
import {readFileSync} from 'fs';

test('phrase parse', (t: Test) => {

  const loreIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.replace('.', '').replace(',', '').toLowerCase().split(/\s+/);

  function getToken() {
    const index = Math.round(Math.random() * (loreIpsum.length -1));
    return {
      type: 'token',
      text: loreIpsum[index]
    };
  }

  function getPhrase(type: 'phrase' | 'quoted_phrase' = 'phrase', length: number = Math.round(Math.random() * 10) + 1) {
    const tokens = R.range(1, length + 1).map(getToken);
    const phrase = {
      type,
      text: tokens.map(tok => tok.text).join(' ').trim()
    };

    const result = type === 'phrase' ? {...phrase, tokens} : phrase;
    return result;
  }

  const predicateParticles = {
    'eq': '=',
    'gt': '>',
    'lt': '<',
    'gte': '>=',
    'lte': '<=',
    'ne': '!='
  };

  function getPredicateParticle() {
    const particles = Object.keys(predicateParticles);
    const rand = Math.round(Math.random() * (particles.length -1));
    const value = particles[rand];
    const text = predicateParticles[value];
    return {
      type: 'relation',
      text,
      value
    };
  }

  function getPredicatePhrase() {
    const rand = Math.round(Math.random());
    const target = getToken();
    const relation = getPredicateParticle();
    const value = rand === 1 ? getToken() : getPhrase('quoted_phrase');
    const text = `${target.text}:${relation.text}${value.type === 'quoted_phrase' ? `"${value.text}"` : value.text}`;
    const predicate = {
      type: 'predicate',
      target,
      relation,
      value,
      text
    };

    return predicate;
  }

  function mixedPhrase() {
    const length = Math.round(Math.random() * 5);
    function randPhrase() {
      const phrases = [() => getPhrase(), () => getPhrase('quoted_phrase'), getPredicatePhrase];
      const rand = Math.round(Math.random() * (phrases.length -1));
      return phrases[rand]();
    }

    const pieces = R.range(0, length).map(randPhrase).reduce(
      (acc, p: any) => {
        const last = acc.length > 0 && acc[acc.length -1];
        if (last && last.type === 'phrase' && p.type === 'phrase') {
          acc[acc.length -1] = {
            type: 'phrase',
            text: last.text + ' ' + p.text,
            tokens: R.concat(last.tokens, p.tokens)
          };
          return acc;
        } else if (p) {
          return [...acc, p];
        } else {
          return [];
        }
      },
      []
    );
    return {
      pieces,
      text: pieces.map((p: any) => {
        if (p.type === 'quoted_phrase') {
          return `"${p.text}"`;
        } else {
          return p.text;
        }
      }).join(' ')
    };
  }

  function deleteDecorations(e: any) {
    delete e.id;
    delete e.position;
    if (e.type === 'phrase') {
      e.tokens = e.tokens.map(deleteDecorations);
    } else if (e.type === 'predicate') {
      e.value = deleteDecorations(e.value);
      e.target = deleteDecorations(e.target);
      e.relation = deleteDecorations(e.relation);
    }

    return e;
  }

  function mixTests(iterations: number, done: number = 0) {
    const mixed = mixedPhrase();
    try {
      const parsed = parse(mixed.text).map(deleteDecorations);
      t.deepEquals(parsed, mixed.pieces, 'Parses mixed phrases');
      if (done < iterations) {
        return mixTests(iterations, done + 1);
      }
    } catch(err) {
      console.error(err);
      t.notOk(true, `Fails with ${mixed.text}`);
    }
  }

  mixTests(1000);
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
