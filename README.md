# @repositive/query-parser

[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://choosealicense.com/licenses/lgpl-3.0/)  
[![npm version](https://badge.fury.io/js/%40repositive%2Fquery-parser.svg)](https://badge.fury.io/js/%40repositive%2Fquery-parser)  
[![CircleCI](https://circleci.com/gh/repositive/query-parser.svg?style=svg)](https://circleci.com/gh/repositive/query-parser)  

* [Installation](#installation)
* [Available Serializers](#available-serializers)
* [Usage](#usage)

The purpose of this library is to transform a search string to a intermediary tokenized data structure that can be used to perform analysis on the search input or as an intermediate structure to translate the query into other DSLs or query structures.

**Features:**
- Basic boolean algebra operators (`AND`, `OR`, `NOT`)
  - Implicit intersections (`AND`) on non quoted spaces.
  - Logic grouping with parens
  > (white or blue) flower not thistle
- Exact match between quoted strings on non predicated tokens.
  > flower "white daisy"
- Predicated/Filtered search
  > family:Asteraceae color:white england


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

**Parsing natural language string**
- **parseString**: `(str: string) => BBTree`  
  _Parses the current string and returns a boolean binary tree representing the search._

**Filter/Predicate operations**
- **getFilters**: `(tree: BBTree) => Filter[]`  
  _Returns an array containing all the filters in the tree._
- **addFilter**: `(tree: BBTree, predicate: string, text: string) => BBTree`  
  _Adds a new filter to the tree_
- **removeFilter**: `(tree: BBTree, predicate: string, text: string) => BBTree`  
  _Returns a new tree with the matching filter removed. If the filter does not exist it will return the same tree._

**Serialization**
- **toBoolString**: `(tree: BBTree) => string`  
  _Serializes a boolean binary tree into a string emulating how a human would write it._
- **toElasticQuery**: `(tree: BBTree) => any`  
  _Serializes the boolean binary tree into a elasticsearch 2.x query._

```ts
import QP from 'npm:@repositive/query-parser';

/**
* "parseString" will generate the following tree from "is:user Istar NOT profession:developer":
* {
*   "value": "AND",
*   "left": {
*     "predicate": "is",
*     "text": "user"
*   },
*   "right": {
*     "value": "AND",
*     "left": {
*       "text": "Istar"
*     },
*     "right": {
*       "value": "NOT",
*       "right": {
*         "predicate": "profession",
*         "text": "developer"
*       }
*     }
*   }
* }
*/
const tree = QP.parseString('is:user Istar NOT profession:developer')

/**
* "getFilters" will return the following array from the previous tree:
* [ {predicate: 'is', text: 'user'}, {predicate: 'profession', text: 'developer'}]
*/
const filters = QP.getFilters(tree);

/**
* If we remove the profession filter with "removeFilter" we expect to end with the following tree:
* {
*   value: 'AND',
*   right: { text: 'Istar' },
*   left: {predicate: 'is', text: 'user'}
* }
*/
const professional = QP.removeFilter(tree, 'profession', 'developer')

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
const awesome = QP.addFilter(professional, 'attribute', 'awesome');


/**
* The serialization value of the new tree using "toBoolString" resembles the text as a human would write it:
* "attribute:awesome is:user Istar"
*/
const newQueryString = QP.toBoolString(awesome);
```
