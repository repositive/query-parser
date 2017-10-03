{
  var btree = require('../b-tree');
  var R = require('ramda');
  var uuid = require('uuid');
}

query "query"
  = _? entity: entity query: query? _? {
    if (entity !== undefined && query !== undefined) {
      return [entity, ...query];
    } else {
      return [entity];
    }
  }
  / eps: "" {
    return [];
  }

entity "entity"
  = predicate
  / quoted_phrase
  / phrase

predicate "predicate"
  = target: token _? [:] _? relation: relation value: quoted_phrase {
    return {
      type: 'predicate',
      target: target,
      relation: relation,
      value: value
    };
  }
  / target: token _? [:] _? relation: relation value: token {
    return {
      type: 'predicate',
      target: target,
      relation: relation,
      value: {
        type: 'phrase',
        text: value
      }
    }
  }

relation "relation"
  = gte
  / lte
  / ne
  / gt
  / lt
  / eq

eq "equals"
  = original: (_? "=" _?) {return 'eq'}
  / _? '' _? {return 'eq'}
exact "exact match" = original: (_? "==" _?) {return 'exact'}
gt "greater than" = original: (_? ">" _?) { return 'gt'}
lt "less than" = original: (_? "<" _?) {return 'lt'}
gte "greater than equals" = original: (_? ">=" _?) {return 'gte'}
lte "less than equals" = original:(_? "<=" _?) {return 'lte'}
ne "not equals"
  = original: (_? "!=" _?) {return 'ne'}
  / original: (_? "!" _?) {return 'ne'}

quoted_phrase "quoted_phrase"
  = ["] _? phrase: phrase _? ["]? {
    return {
      type: 'quoted_phrase',
      text: phrase.text
    };
  }
  / quoted: (["] ["]) {
    return {
      type: 'quoted_phrase',
      text: ''
    };
  }

phrase "phrase"
  = token: token s:_ !predicate phrase: phrase {
    return {
      type: 'phrase',
      text: token + s + phrase.text
    };
  }
  / token: token {
    return {
      type: 'phrase',
      text: token
    };
  }

token "token"
  = token:[a-zA-Z0-9\u007F-\uFFFF_@'\/\\+\&\.\,\(\)\<>\-\|\*\!]+ {
      return token.join('')
  }

_ "whitespace"
  = s: [ \t\n\r?]+ { return s.join('') }


