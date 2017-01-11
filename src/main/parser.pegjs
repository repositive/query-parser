
expression "expression"
  =  start? head:term op:(OR/AND) tail:expression end? {
      return {
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
  = filter
  / negate
  / identifier
  / nest

negate "negation"
  = _? op:NOT _? tail: term {
    return {
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
  = i:([a-zA-Z0-9\u007F-\uFFFF_@'\/\\+\&\.<>\-]+ / quoted) {return { text: i.join('')} }

quoted = ["] id:[^"]+ ["] {return id}

filter = p:identifier _? [:] _? t:(identifier/quoted) {
  return {
    predicate: p.text,
    text: t.text
  }
}

start
  =  $_?

end
  = _?!.

empty = start end {
  return  {}
}

_ "whitespace"
  = [ \t\n\r,?]+
