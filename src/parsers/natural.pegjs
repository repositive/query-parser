{
  var btree = require('../b-tree');
}

/**
* All nodes have following fields:
* Node {
*   _id: string;
*   _type: string;
* }
*
* Types: 'expression', 'negation', 'token', 'predicate', 'existence'
*/

expression "expression"
  =  start: start? head:node op:OR tail:expression end: end? {
      if (head && tail) {
        return btree.or({
          left: head,
          right: tail,
          natural: {
           _original: head._original + op + tail._original
          }
        });
      } else {
        return head;
      }
    }
  /  start: start? head:node op:AND tail:expression end: end? {
      if (head && tail) {
        return btree.and({
          left: head,
          right: tail,
          natural: {
            _original: head._original + op + tail._original
          }
        });
      } else {
        return head;
      }
    }
  / start? t:node end? { return t }
  / empty

nest "nested expression"
  = start? "(" s1:_? expr:expression s2:_? ")" end? {
    return Object.freeze(Object.assign({}, expr, {
      _original: "(" + (s1 || '') + expr._original + (s2 || '') + ")"
    })); 
  }

node "node"
  // = property_exists
  = predicate
  / negate
  / token
  / nest

negate "negation"
  = s1:_? op:NOT s2:_? tail: node {
    return btree.not(
      tail,
      {
        _original: (s1 || '') + op + (s2 || '') + tail._original
      }
    );
  }

AND "and"
  = original: (_ "AND" _) {return original.join('')}
  / original: (_ "and" _) {return original.join('')}
  / original: (_ "+" _?) {return original.join('')}
  / original: (_) {return original}

OR "or"
 = original: (_ "OR" _) {return original.join('')}
 / original: (_ "or" _) {return original.join('')}

NOT "not"
 = original: ("NOT" _) {return original.join('')}
 / original: ("not" _) {return original.join('')}
 / original: (_? "-" _?) {return original.join('')}
 / original: (_? "!" _?) {return original.join('')}

token "token"
  = i:[a-zA-Z0-9\u007F-\uFFFF_@'\/\\+\&\.<>\-\|\*]+ {
      return btree.token(i.join(''), {_original: i.join('')});
    }
    / i:quoted {
      return btree.token(i.join(''), {_original: '"' + i.join('') + '"'});
    }

quoted "quoted" = ["] id:[^"]+ ["] {return id}

predicate = p:token s1:_? [:] s2:_? c:relation? v:token {
  return btree.predicate({
    key: p.value,
    relation: (c && c.value) || '=',
    value: v.value,
    natural: {
      _original: p._original + (s1 || '') + ':' + (s2 || '') + ((c && c.original) || '') + v._original
    }
  });
}

start
  =  _?

end
  = _?!.

empty = start end {
  return  undefined
}

relation
  = exact
  / gte
  / lte
  / ne
  / eq
  / gt
  / lt

eq "equals" = original: (_? "=" _?) {return {value:"=", original: original.join('')}}
exact "exact match" = original: (_? "==" _?) {return {value:"==", original: original.join('')}}
gt "greater than" = original: (_? ">" _?) {return {value: ">", original: original.join('')}}
lt "less than" = original: (_? "<" _?) {return {value: "<", original: original.join('')}}
gte "greater than equals" = original: (_? ">=" _?) {return {value: ">=", original: original.join('')}}
lte "less than equals" = original:(_? "<=" _?) {return {value: "<=", original: original.join('')}}
ne "not equals"
  = original: (_? "!=" _?) {return {value: "!", original: original.join('')}}
  / original: (_? "!" _?) {return {value: "!", original: original.join('')}}

_ "whitespace"
  = s: [ \t\n\r,?]+ { return s.join('') }
