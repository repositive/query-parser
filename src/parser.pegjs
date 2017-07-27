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
  =  start? head:term op:(OR/AND) tail:expression end? {
      return {
        _id: uuid(),
        _type: 'expression',
        value: op,
        left: head,
        right: tail
      };
    }
  / start? t:term end? { return t }
  / empty

nest "nested expression"
  = start? "(" _? expr:expression _? ")" end? { return expr; }

term "term"
  = property_exists
  / filter
  / negate
  / identifier
  / nest

negate "negation"
  = _? op:NOT _? tail: term {
    return {
      _id: uuid(),
      _type: 'negation',
      value: op,
      right: tail
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

identifier "identifier"
  = i:([a-zA-Z0-9\u007F-\uFFFF_@'\/\\+\&\.<>\-]+ / quoted) {
    return {
      _id: uuid(),
      _type: 'token',
      value: i.join('')
    }
  }

quoted = ["] id:[^"]+ ["] {return id}

property_exists = p:identifier _? [:] "*" {
  return {
    _id: uuid(),
    _type: 'existence',
    predicate: p.value
  }
}

filter = p:identifier _? [:] _? c:relation? t:identifier {
  return {
    _id: uuid(),
    _type: 'filter',
    predicate: p.value,
    relation: c || 'eq',
    value: t.value
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

eq "equals" = _? "=" _? {return "eq"}
exact "exact match" = _? "==" _? {return "exact"}
gt "greater than" = _? ">" _? {return "gt"}
lt "less than" = _? "<" _? {return "lt"}
gte "greater than equals" = _? ">=" _? {return "gte"}
lte "less than equals" = _? "<=" _? {return "lte"}
ne "not equals"
  = _? "!=" _? {return "ne"}
  / _? "!" _? {return "ne"}

_ "whitespace"
  = [ \t\n\r,?]+
