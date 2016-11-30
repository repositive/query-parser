/**
 * Created by dennis on 28/11/2016.
 */

import * as test from 'tape';
import { toBoolString } from '../main/serializers/string';
import { toElasticQuery } from '../main/serializers/elastic-2.4';
import {BTree, Term, BooleanOperator, Filter, SearchNode} from "../main/b-tree";


/*
 ############################################################################
 ###################            String serializer         ###################
 ############################################################################
 */
// const input1 = {
//   $and: [
//     {text: 'cancer'},
//     {assay: 'X'},
//     {$or: [
//       {collection: 'Y'},
//       {collection: 'Z'}
//     ]}
//   ]
// };
const simpleTree1:BTree<SearchNode> = {
  value: {
    text: 'cancer'
  }
};

const simpleTree2:BTree<SearchNode> = {
  value: {
    operator: 'AND'
  },
  left: {
    value: {
      text: 'cancer'
    }
  },
  right: {
    value: {
      text: 'RNA-Seq',
      predicate: 'assay'
    }
  }
};



test('Should return string', function (t) {
  t.plan(1);
  const result = toBoolString(simpleTree1);
  t.equal(typeof result, 'string');
});

test('Single text terms', function (t) {
  t.plan(1);
  t.equal(toBoolString(simpleTree1), 'cancer');
});

test('Simple boolean terms', function (t) {
  t.plan(1);
  t.equal(toBoolString(simpleTree2), '(cancer AND assay:RNA-Seq)');
});


const tree1:BTree<SearchNode> = {
  value: {
    operator: 'AND'
  },
  left: {
    value: {
      text: 'glaucoma'
    }
  },
  right: {
    value: {
      operator: 'AND'
    },
    left: {
      value: {
        operator: 'NOT'
      },
      right: {
        value: {
          operator: 'OR'
        },
        left: {
          value: {
            predicate: 'assay',
            text: 'X'
          }
        },
        right: {
          value: {
            predicate: 'assay',
            text: 'Y'
          }
        }
      }
    },
    right: {
      value: {
        predicate: 'collection',
        text: 'X'
      }
    }
  }
};


test('Nested NOT and Boolean terms', function (t) {
  t.plan(1);
  t.equal(toBoolString(tree1), '(glaucoma AND (NOT (assay:X OR assay:Y) AND collection:X))');
});


// test('Should handle simple AND and OR', function (t) {
//   t.plan(1);
//   const result = toBoolString(input1);
//   t.equal(result, '(cancer AND assay:X AND (collection:Y OR collection:Z))');
// });
//
// const onlyNOT = {
//   $not: [
//     {text: 'cancer'}
//   ]
// };
//
// const ANDNOT = {
//   $and: [
//     {text: 'cancer'},
//     {$not: [
//       {text: 'glaucoma'}
//     ]}
//   ]
// };
//
// test('Should handle simple queries', function (t) {
//   t.plan(2);
//   t.equal(toBoolString(onlyNOT), 'NOT cancer');
//   t.equal(toBoolString(ANDNOT), '(cancer AND NOT glaucoma)');
// });
//
//
// const withNOT = {
//   $and: [
//     {text: 'cancer'},
//     {
//       $not: [{
//         text: 'breast'
//       }]
//     },
//     {assay: 'X'},
//     {$or: [
//       {collection: 'Y'},
//       {collection: 'Z'}
//     ]}
//   ]
// };
//
// const nestedNOT = {
//   $and: [
//     {text: 'glaucoma'},
//     {$not: [
//       {$or: [
//         {assay: 'X'},
//         {assay: 'Y'}
//       ]}
//     ]},
//     {collection: 'X'}
//   ]
// };
//
// test('Should handle nested NOT', function (t) {
//   t.plan(2);
//   t.equal(toBoolString(withNOT), '(cancer AND NOT breast AND assay:X AND (collection:Y OR collection:Z))');
//   t.equal(toBoolString(nestedNOT), '(glaucoma AND NOT (assay:X OR assay:Y) AND collection:X)');
// });
//
// const deepNestedNOT = {
//   $and: [
//     {text: 'glaucoma'},
//     {$not: [
//       {$or: [
//         {assay: 'X'},
//         {assay: 'Y'},
//         {$and:[
//           {access: 'O'},
//           {type: 'D'}
//         ]}
//       ]}
//     ]},
//     {$or: [
//       {collection: 'X'},
//       {collection: 'Z'}
//     ]}
//   ]
// };
//
// test('Should handle nested AND and NOTs', function (t) {
//   t.plan(1);
//   t.equal(toBoolString(deepNestedNOT), '(glaucoma AND NOT (assay:X OR assay:Y OR (access:O AND type:D))' +
//     ' AND (collection:X OR collection:Z))');
// });
//
// const whiteSpace = {
//   $and: [
//     {text: 'breast cancer'},
//     {$not: [
//       {$or: [
//         {assay: 'RNA Seq'},
//         {assay: 'Y'},
//         {$and:[
//           {access: 'O'},
//           {type: 'D'}
//         ]}
//       ]}
//     ]},
//     {$or: [
//       {collection: 'X'},
//       {collection: 'Z'}
//     ]}
//   ]
// };
//
// test('Should deal with whitespace', function (t) {
//   t.plan(1);
//   t.equal(toBoolString(whiteSpace), '("breast cancer" AND NOT (assay:"RNA Seq" OR assay:Y OR (access:O AND type:D))' +
//     ' AND (collection:X OR collection:Z))');
// });

/*
 ############################################################################
 ###################       Elasticsearch serializer       ###################
 ############################################################################
 */

const ES1 = {
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "_all": "breast cancer"
          }
        },
        {
          "bool": {
            "must_not": [
              {
                "bool": {
                  "should": [
                    {
                      "match": {
                        "assay": "RNA-Seq"
                      }
                    },
                    {
                      "match": {
                        "assay": "RNA-seq"
                      }
                    },
                    {
                      "bool": {
                        "must": [
                          {
                            "match": {
                              "access": "Open"
                            }
                          },
                          {
                            "match": {
                              "properties.tissue": "breast"
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "bool": {
            "should": [
              {
                "match": {
                  "collection": "ceeb70df-5c88-4aed-ba8a-a44386a89b5e"
                }
              },
              {
                "match": {
                  "collection": "e853a7f3-eed6-4942-a823-b5164820e4a2"
                }
              }
            ]
          }
        }
      ]
    }
  }
};

const ESInput = {
  $and: [
    {text: 'breast cancer'},
    {$not: [
      {$or: [
        {assay: 'RNA-Seq'},
        {assay: 'RNA-seq'},
        {$and:[
          {access: 'Open'},
          {"properties.tissue": 'breast'}
        ]}
      ]}
    ]},
    {$or: [
      {collection: 'ceeb70df-5c88-4aed-ba8a-a44386a89b5e'},
      {collection: 'e853a7f3-eed6-4942-a823-b5164820e4a2'}
    ]}
  ]
};

// test('ES - Should create object', function (t) {
//   t.plan(1);
//   t.equal(typeof toElasticQuery(whiteSpace), 'object');
// });

test('ES - should create correct object', function (t) {
  t.plan(1);
  t.equal(JSON.stringify(toElasticQuery(ESInput)), JSON.stringify(ES1));
});



