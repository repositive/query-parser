
expression "expression"
  =  head:term op:(OR/AND) tail:expression {
      return {
        value: op,
        left: head,
        right: tail
      };
    }
  / term

nest "nested expression"
  = "(" _? expr:expression _? ")" { return expr; }

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
  / _? "+" _? {return "AND"}
  / _ {return "AND"}

OR "or"
 = _ "OR" _ {return "OR"}
 / _ "or" _ {return "OR"}

NOT "not"
 = "NOT" _ {return "NOT"}
 / "not" _ {return "NOT"}
 / _? "-" _? {return "NOT"}

identifier "identifier"
  = i:([a-zA-Z0-9_\-]+ / quoted) {return { text: i.join('')} }

quoted = ["] id:[a-zA-Z0-9\-_() ]+ ["] {return id}

filter = p:identifier _? [:] _? t:(identifier/quoted) {
  return {
    predicate: p.text,
    text: t.text
  }
}

_ "whitespace"
  = [ \t\n\r]+
