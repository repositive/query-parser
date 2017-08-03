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
  =  start? head:node op:(OR/AND) tail:expression end? {
      const expression = op === 'AND' ? btree.and : btree.or;
      return expression({
        left: head,
        right: tail
      });
    }
  / start? t:node end? { return t }
  / empty

nest "nested expression"
  = start? "(" _? expr:expression _? ")" end? { return expr; }

node "node"
  // = property_exists
  = predicate
  / negate
  / token
  / nest

negate "negation"
  = _? op:NOT _? tail: node {
    return btree.not(tail);
  }

AND "and"
  = _ "AND" _ {return "AND"}
  / _ "and" _ {return "AND"}
  / _ "+" _? {return "AND"}
  / _ {return "AND"}

OR "or"
 = _ "OR" _ {return "OR"}
 / _ "or" _ {return "OR"}

NOT "not"
 = "NOT" _ {return "NOT"}
 / "not" _ {return "NOT"}
 / _? "-" _? {return "NOT"}
 / _? "!" _? {return "NOT"}

token "token"
  = i:[a-zA-Z0-9\u007F-\uFFFF_@'\/\\+\&\.<>\-\|]+ {
      return btree.token(i.join(''));
    }
    / i:quoted {
      return btree.token(i.join(''));
    }

quoted "quoted" = ["] id:[^"]+ ["] {return id}

predicate = p:token _? [:] _? c:relation? v:token {
  return btree.predicate({
    key: p.value,
    relation: c || '=',
    value: v.value
  });
}

start
  =  $_?

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

eq "equals" = _? "=" _? {return "="}
exact "exact match" = _? "==" _? {return "=="}
gt "greater than" = _? ">" _? {return ">"}
lt "less than" = _? "<" _? {return "<"}
gte "greater than equals" = _? ">=" _? {return ">="}
lte "less than equals" = _? "<=" _? {return "<="}
ne "not equals"
  = _? "!=" _? {return "!"}
  / _? "!" _? {return "!"}

_ "whitespace"
  = [ \t\n\r,?]+
