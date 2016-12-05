import * as test from 'tape';
import {toElasticQuery} from "../../main/serializers/elastic-seralizer";
import {BTree} from "../../main/b-tree/index";
import {BooleanOperator, BTreeLeaf} from '../../main/b-exp-tree';

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
                      "bool": {
                        "should": [
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
              }
            ]
          }
        }
      ]
    }
  }
};

const complexTree: BTree<BooleanOperator, BTreeLeaf> = {
  value: {
    operator: 'AND'
  },
  left: {
    text: 'breast cancer'
  },
  right: <BTree<BooleanOperator, BTreeLeaf>>{
    value: {
      operator: 'NOT'
    },
    right: <BTree<BooleanOperator, BTreeLeaf>>{
      value: {
        operator: 'OR'
      },
      left: {
        predicate: 'assay',
        text: 'RNA-Seq'
      },
      right: <BTree<BooleanOperator, BTreeLeaf>> {
        value: {
          operator: 'OR'
        },
        left: {
          predicate: 'assay',
          text: 'RNA-seq'
        },
        right: <BTree<BooleanOperator, BTreeLeaf>> {
          value: {
            operator: 'AND'
          },
          left: {
            predicate: 'access',
            text: 'Open'
          },
          right: {
            predicate: 'properties.tissue',
            text: 'breast'
          }
        }
      }
    }
  }
};

test('ES - should create correct object', function (t) {
  t.plan(1);
  t.equal(JSON.stringify(toElasticQuery(complexTree)), JSON.stringify(ES1));
});
