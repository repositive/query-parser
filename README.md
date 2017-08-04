# @repositive/query-parser

[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://choosealicense.com/licenses/lgpl-3.0/)  
[![npm version](https://badge.fury.io/js/%40repositive%2Fquery-parser.svg)](https://badge.fury.io/js/%40repositive%2Fquery-parser)  
[![CircleCI](https://circleci.com/gh/repositive/query-parser.svg?style=svg)](https://circleci.com/gh/repositive/query-parser)  

* [Installation](#installation)
* [Available Serializers](#available-serializers)
* [Usage](#usage)

The purpose of this library is to transform a search string to a tokenized data structure that can be used to perform analysis on the search input or as an intermediate structure to translate the query into other DSLs or query structures.

**Features:**
- Basic boolean algebra operators (`AND`, `OR`, `NOT`)
  - Implicit intersections (`AND`) on non quoted spaces.
  - Logic grouping with parens
  > (white or blue) flower not thistle
- Exact match between quoted strings on non predicated tokens.
  > flower "white daisy"
- Predicated/Filtered search
  > family:Asteraceae population:>100000 england


### Installation

**With npm:**
```bash
$ npm i @repositive/query-parser
```


### Available Serializers

- Natural Language String
- ElasticSearch 2.x


### Usage

The library exposes the following functions:

**Tree construction**
- **token**: `(str: string) => Token`
- **predicate**: `({key: string, value: string}) => Predicate`
- **and**: `<L extends Node, R extends  Node>({left: L, right: R}) => AND<L, R>`
- **or**: `<L extends Node, R extends Node>({left: L, right: R}) => OR<L, R>`
- **not**: `<N extends Node>(negated: N) => NOT<N>`

**Tools**
- **fold**: `<R>(node: Node, f: (node: Node, l: R, r: R) => R, R) => R`
- **filter**: `<R> (node: Node, f: (node: Node) => node is R) => R[]`
- **path**: `(node: Node, target: Node) => Node[]`
- **remove**: `(node: Node, target: Node) => Node`
- **replace**: `({on: Node, target: Node, replacement: Node}) => Node`


**Parsing natural language string**
- **fromNatural**: `(str: string) => Node`  
  _Parses the current string and returns a boolean binary tree representing the search._

**Serialization**
- **toNatural**: `(tree: Node) => string`  
  _Serializes a boolean binary tree into a string emulating how a human would write it._
- **toElastic2**: `(tree: Node) => any`  
  _Serializes the boolean binary tree into a elasticsearch 2.x query._

```ts
import QP from 'npm:@repositive/query-parser';
// var QP = require(`@repositive/query-parser`); non ES6
/**
* "fromNatural" will generate the following tree from "is:user Istar NOT profession:developer":
* {                            
*   "_id": "6bd6c61f-eab6-43bc-81d2-97f96c7c5f0a",           
*   "_type": "AND",            
*   "left": {                  
*     "_id": "081c058a-e8cc-4ede-9637-6fd6593d5388",         
*     "_type": "predicate",    
*     "key": "is",             
*     "relation": "=",         
*     "value": "user"          
*   },                         
*   "right": {                 
*     "_id": "4719c7d4-965a-45cc-8132-87ed3acdc560",         
*     "_type": "AND",          
*     "left": {                
*       "_id": "8c8fae87-3aeb-4298-8f29-baf4c761ca12",       
*       "_type": "token",      
*       "value": "Istar"       
*     },                       
*     "right": {               
*       "_id": "b0b49e4a-c2cc-4954-bc1d-b68bad17f441",       
*       "_type": "NOT",        
*       "negated": {           
*         "_id": "323596ca-24fa-4ec5-a7a5-0d4d1ed45645",     
*         "_type": "predicate",                              
*         "key": "profession", 
*         "relation": "=",     
*         "value": "developer" 
*       }                      
*     }                        
*   }                          
* }         
*/
const tree = QP.fromNatural('is:user Istar NOT profession:developer')

/*
* We can find the profession predicate using the filter function
*
*/
const profession = QP.filter(tree, (n) => n.key === 'profession')[0];

/**
* If we remove the profession filter with "remove" we expect to end with the following tree:
* {
*   value: 'AND',
*   right: { text: 'Istar' },
*   left: {predicate: 'is', text: 'user'}
* }
*/
const professional = QP.remove(tree, profession);

/**
* Adding a new filter (attribute:awesome) to the three will return a new tree with the attribute inserted in the leftmost position
* {
*   value: 'AND',
*   left: { predicate: 'attribute', text: 'awesome'},
*   right: {
*     value: 'AND',
*     right: { text: 'Istar' },
*     left: { predicate: 'is', text: 'user'}
*   }
* }
*/
const awesome = QP.and({left: professional, right: QP.predicate({key: 'attribute', value: 'awesome'}));

/**
* The serialization value of the new tree using "toBoolString" resembles the text as a human would write it:
* "is:user Istar attribute: awesome"
*/
const newQueryString = QP.toNatural(awesome);
```
