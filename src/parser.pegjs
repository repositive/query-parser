{
  var uuid = require('uuid').v4;
}

/**
* All nodes have following fields:
* Node {
*   _id: string;
*   _type: string;
* }
*
* Types: 'expression', 'negation', 'token', 'filter', 'existence'
*/

expression "expression"
  =  start? head:node op:(OR/AND) tail:expression end? {
      return {
        _id: uuid(),
        _type: 'expression',
        value: op,
        left: head,
        right: tail
      };
    }
  / start? t:node end? { return t }
  / empty

nest "nested expression"
  = start? "(" _? expr:expression _? ")" end? { return expr; }

node "node"
  = property_exists
  / filter
  / negate
  / token
  / nest

negate "negation"
  = _? op:NOT _? tail: node {
    return {
      _id: uuid(),
      _type: 'negation',
      value: tail
    }
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
  = i:[a-zA-Z0-9\u007F-\uFFFF_@'\/\\+\&\.<>\-]+ {
      return {
        _id: uuid(),
        _type: 'token',
        value: i.join('')
      }
    }
    / i:quoted {
      return {
        _id: uuid(),
        _type: 'token',
        value: i.join('')
      }
    }

quoted "quoted" = ["] id:[^"]+ ["] {return id}

property_exists = p:token _? [:] "*" {
  return {
    _id: uuid(),
    _type: 'existence',
    predicate: p.value
  }
}

filter = p:token _? [:] _? c:relation? v:token {
  return {
    _id: uuid(),
    _type: 'filter',
    predicate: p.value,
    relation: c || 'EQ',
    value: v
  }
}

start
  =  $_?

end
  = _?!.

empty = start end {
  return  {}
}

relation
  = exact
  / gte
  / lte
  / ne
  / eq
  / gt
  / lt

eq "equals" = _? "=" _? {return "EQ"}
exact "exact match" = _? "==" _? {return "EXACT"}
gt "greater than" = _? ">" _? {return "GT"}
lt "less than" = _? "<" _? {return "LT"}
gte "greater than equals" = _? ">=" _? {return "GTE"}
lte "less than equals" = _? "<=" _? {return "LTE"}
ne "not equals"
  = _? "!=" _? {return "NE"}
  / _? "!" _? {return "NE"}

_ "whitespace"
  = [ \t\n\r,?]+
