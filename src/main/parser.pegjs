
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
  = range 
  / property_exists
  / filter
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

pidentifier "predicate identifier"
  = i:([a-zA-Z0-9\u007F-\uFFFF_@'\/\\+\&\<>-]+ / quoted) {return { text: i.join('')} }

quoted = ["] id:[^"]+ ["] {return id}

property_exists = p:identifier _? [:] "*" { return {exists: p.text}}

filter = p:identifier _? [:] _? c:relation? t:identifier {
  return {
    predicate: p.text,
    relation: c || 'eq',
    text: t.text
  }
}

range
  = p:identifier _? [:] _? "*" _? [.][.] _? t:pidentifier {
    return {
      predicate: p.text,
      relation: "lte",
      text: t.text
    }
  }
  / p:identifier _? [:] _? t:pidentifier _? [.][.] _? "*" {
    return {
      predicate: p.text,
      relation: "gte",
      text: t.text
    }
  }
  / p:identifier _? [:] _? t1:pidentifier _? [.][.] _? t2:pidentifier {
    return {
      predicate: p.text,
      from: t1.text,
      to: t2.text
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
