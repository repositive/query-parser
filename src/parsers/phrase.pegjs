{
  var btree = require('../b-tree');
  var R = require('ramda');
  var uuid = require('uuid');

  function reposition(len, elem) {
    var newPos = {
      from: elem.position.from + len,
      to: elem.position.to + len
    };
    if (elem.type === 'phrase') {
      return Object.assign({}, elem, {
        position: newPos,
        tokens: elem.tokens.map(t => reposition(len, t))
      });
    } else if (elem.type === 'predicate') {
      return Object.assign({}, elem, {
        position: newPos,
        relation: reposition(len, elem.relation),
        target: reposition(len, elem.target),
        value: reposition(len, elem.value)
      });
    } else {
      return Object.assign({}, elem, {
        position: newPos
      });
    }
  }
}

query "query"
  = s1: _? entity: entity query: query? {
    var s1len = s1 ? s1.length : 0;
    var ent = reposition(s1len, entity);
    if (entity !== undefined && query !== undefined) {
      return R.insert(0, ent, query.map((q) => reposition(ent.position.to + 1, q)));
    } else {
      return [entity];
    }
  }
  / eps: _? "" {
    return [];
  }

entity "entity"
  = predicate
  / quoted_phrase
  / phrase

predicate "predicate"
  = target: token e1:_? [:] e2:_? relation: relation value: quoted_phrase {
    var text = target.text + (e1 ? e1 : '') + ':' + (e2 ? e2 : '') + relation.text + '"' + value.text + '"'
    var e1len = e1 ? e1.length : 0;
    var e2len = e2 ? e2.length : 0;
    return {
      id: uuid.v4(),
      type: 'predicate',
      position: {
        from: 0,
        to: text.length - 1
      },
      target: target,
      relation: relation,
      value: reposition(target.position.to + e1len + 1 + e2len + 1, value),
      text: text
    };
  }
  / target: token e1:_? [:] e2:_? relation: relation value: token {
    var text = target.text + (e1 ? e1 : '') + ':' + (e2 ? e2 : '') + relation.text + value.text
    var e1len = e1 ? e1.length : 0;
    var e2len = e2 ? e2.length : 0;
    return {
      id: uuid.v4(),
      type: 'predicate',
      position: {
        from: 0,
        to: text.length -1
      },
      target: target,
      relation: relation,
      value:  reposition(target.position.to + e1len + 1 + e2len + 1, value),
      text: text
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
  = original: (_? "=" _?) {return { id: uuid.v4(), type: 'relation', position: {from: 0, to: original.length -1}, text: original.join(''), value: 'eq' }}
  / original: (_? '' _?) {return {id: uuid.v4(), type: 'relation', position: {from: 0, to: original.length -1}, text: original.join(''), value: 'eq'}}
exact "exact match" = original: (_? "==" _?) {return {id: uuid.v4(), type: 'relation', position: {from: 0, to: original.length -1}, text: original.join(''), value :'exact'}}
gt "greater than" = original: (_? ">" _?) { return {id: uuid.v4(), type: 'relation', position: {from: 0, to: original.length -1}, text: original.join(''), value: 'gt'}}
lt "less than" = original: (_? "<" _?) {return {id: uuid.v4(), type: 'relation', position: {from: 0, to: original.length -1}, text: original.join(''), value: 'lt'}}
gte "greater than equals" = original: (_? ">=" _?) {return {id: uuid.v4(), type: 'relation', position: {from: 0, to: original.length -1}, text: original.join(''), value: 'gte'}}
lte "less than equals" = original:(_? "<=" _?) {return {id: uuid.v4(), type: 'relation', position: {from: 0, to: original.length -1}, text: original.join(''), value: 'lte'}}
ne "not equals"
  = original: (_? "!=" _?) {return {id: uuid.v4(), type: 'relation', position: {from: 0, to: original.length -1}, text: original.join(''), value: 'ne'}}
  / original: (_? "!" _?) {return {id: uuid.v4(), type: 'relation', position: {from: 0, to: original.length -1}, text: original.join(''), value: 'ne'}}

quoted_phrase "quoted_phrase"
  = ["] s1:_? phrase: phrase s2:_? e:["]? {
    var s1len = (s1 ? s1.length : 0);
    var s2len = (s2 ? s2.length : 0);
    var text = (s1 ? s1 : '') + phrase.text + (s2 ? s2 : '');
    return {
      id: uuid.v4(),
      type: 'quoted_phrase',
      position: {
        from: 0,
        to: s1len + s2len + (e ? e.length : 0) + phrase.position.to + 1
      },
      text: text
    };
  }
  / ["] e:["]? {
    return {
      id: uuid.v4(),
      type: 'quoted_phrase',
      position: {
        from: 0,
        to: (e ? 1 : 0)
      },
      text: ''
    };
  }

phrase "phrase"
  = token: token s:_ !predicate phrase: phrase {
    var text = token.text + s + phrase.text;
    return {
      id: uuid.v4(),
      type: 'phrase',
      tokens: R.insert(0, token, phrase.tokens.map(t => reposition(token.position.to + s.length + 1, t))),
      position: {
        from: 0,
        to: text.length - 1
      },
      text: text
    };
  }
  / token: token {
    return {
      id: uuid.v4(),
      type: 'phrase',
      tokens: [token],
      position: token.position,
      text: token.text
    };
  }

token "token"
  = token:[a-zA-Z0-9\u007F-\uFFFF_@'\/\\+\&\.\,\(\)\<>\-\|\*\!]+ {
      return {
        id: uuid.v4(),
        type: 'token',
        position: {
          from: 0,
          to: token.length -1
        },
        text: token.join('')
      }
  }

_ "whitespace"
  = s: [ \t\n\r?]+ { return s.join('') }


