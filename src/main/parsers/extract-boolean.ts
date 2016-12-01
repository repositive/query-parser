import {Token} from "./base-parser";

export default function extractBoolean(input:string): Token[] {
  function explicit(input) {

  }
  //
  // const matches = input.match(/\s(AND|OR|NOT)\s/g);
  //
  // let splits = input.split(/\sAND\s/g);
  // const operator = 'AND';
  // let froms = [];
  // let tos = [];
  // let index = 0;
  // splits.forEach(s => {
  //   index += s.length;
  //   froms.push(index);
  //   let to = index + operator.length;
  //   tos.push(to);
  // });
  //
  // console.log(froms, tos);
  //
  //
  // console.log(splits);

  // matches.map(m => {
  //   return <Token> {
  //     type: 'bo',
  //     from: input.indexOf(m)
  //   }
  // });
  
  return [];
}