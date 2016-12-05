import * as test from 'tape';
import {toElasticQuery} from "../../main/serializers/elastic-seralizer";
import {BTree} from "../../main/b-tree/index";
import {SearchNode} from '../../main/b-exp-tree';

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

const complexTree:BTree<SearchNode> = {
  value: {
    operator: 'AND'
  },
  left: {
    value: {
      text: 'breast cancer'
    }
  },
  right: {
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
          text: 'RNA-Seq'
        }
      },
      right: {
        value: {
          operator: 'OR'
        },
        left: {
          value: {
            predicate: 'assay',
            text: 'RNA-seq'
          }
        },
        right: {
          value: {
            operator: 'AND'
          },
          left: {
            value: {
              predicate: 'access',
              text: 'Open'
            }
          },
          right: {
            value: {
              predicate: 'properties.tissue',
              text: 'breast'
            }
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
