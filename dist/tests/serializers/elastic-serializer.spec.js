"use strict";
var test = require('tape');
var index_1 = require("../../main/index");
/*
 ############################################################################
 ###################       Elasticsearch serializer       ###################
 ############################################################################
 */
var ES1 = {
    "query": {
        "bool": {
            "must": [
                {
                    "match_phrase": {
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
                                                        "match_phrase": {
                                                            "assay": "Methylation Profiling by Array"
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
var complexTree = {
    value: 'AND',
    left: {
        text: 'breast cancer'
    },
    right: {
        value: 'NOT',
        right: {
            value: 'OR',
            left: {
                predicate: 'assay',
                text: 'RNA-Seq'
            },
            right: {
                value: 'OR',
                left: {
                    predicate: 'assay',
                    text: 'Methylation Profiling by Array'
                },
                right: {
                    value: 'AND',
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
    t.equal(JSON.stringify(index_1.toElasticQuery(complexTree)), JSON.stringify(ES1));
});
var emptyQuery = {
    "query": {
        "match_all": {}
    }
};
test('Handle null requests', function (t) {
    t.plan(1);
    t.deepEquals(emptyQuery, index_1.toElasticQuery(null));
});
test('Exact queries need to use match_phrase', function (t) {
    t.plan(1);
    var str = '"breast cancer"';
    var tree = index_1.parseString(str);
    var query = index_1.toElasticQuery(tree);
    t.deepEqual(query, { query: { match_phrase: { _all: 'breast cancer' } } });
});
test('Use match_phrase for filters with space too', function (t) {
    t.plan(1);
    var str = 'title:"breast cancer"';
    var tree = index_1.parseString(str);
    var query = index_1.toElasticQuery(tree);
    t.deepEqual(query, { query: { match_phrase: { title: 'breast cancer' } } });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxhc3RpYy1zZXJpYWxpemVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvc2VyaWFsaXplcnMvZWxhc3RpYy1zZXJpYWxpemVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBQzdCLHNCQUEwQyxrQkFBa0IsQ0FBQyxDQUFBO0FBSTdEOzs7O0dBSUc7QUFFSCxJQUFNLEdBQUcsR0FBRztJQUNWLE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRTtZQUNOLE1BQU0sRUFBRTtnQkFDTjtvQkFDRSxjQUFjLEVBQUU7d0JBQ2QsTUFBTSxFQUFFLGVBQWU7cUJBQ3hCO2lCQUNGO2dCQUNEO29CQUNFLE1BQU0sRUFBRTt3QkFDTixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsTUFBTSxFQUFFO29DQUNOLFFBQVEsRUFBRTt3Q0FDUjs0Q0FDRSxPQUFPLEVBQUU7Z0RBQ1AsT0FBTyxFQUFFLFNBQVM7NkNBQ25CO3lDQUNGO3dDQUNEOzRDQUNFLE1BQU0sRUFBRTtnREFDTixRQUFRLEVBQUU7b0RBQ1I7d0RBQ0UsY0FBYyxFQUFFOzREQUNkLE9BQU8sRUFBRSxnQ0FBZ0M7eURBQzFDO3FEQUNGO29EQUNEO3dEQUNFLE1BQU0sRUFBRTs0REFDTixNQUFNLEVBQUU7Z0VBQ047b0VBQ0UsT0FBTyxFQUFFO3dFQUNQLFFBQVEsRUFBRSxNQUFNO3FFQUNqQjtpRUFDRjtnRUFDRDtvRUFDRSxPQUFPLEVBQUU7d0VBQ1AsbUJBQW1CLEVBQUUsUUFBUTtxRUFDOUI7aUVBQ0Y7NkRBQ0Y7eURBQ0Y7cURBQ0Y7aURBQ0Y7NkNBQ0Y7eUNBQ0Y7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsSUFBTSxXQUFXLEdBQXNDO0lBQ3JELEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0os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