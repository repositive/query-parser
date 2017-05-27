"use strict";
var test = require('tape');
var main_1 = require('../../main');
/*
 ############################################################################
 ###################       Elasticsearch serializer       ###################
 ############################################################################
 */
var ES1 = {
    'query': {
        'bool': {
            'must': [
                {
                    'match_phrase': {
                        '_all': 'breast cancer'
                    }
                },
                {
                    'bool': {
                        'must_not': [
                            {
                                'bool': {
                                    'should': [
                                        {
                                            'match': {
                                                'assay': 'RNA-Seq'
                                            }
                                        },
                                        {
                                            'bool': {
                                                'should': [
                                                    {
                                                        'match_phrase': {
                                                            'assay': 'Methylation Profiling by Array'
                                                        }
                                                    },
                                                    {
                                                        'bool': {
                                                            'must': [
                                                                {
                                                                    'match': {
                                                                        'access': 'Open'
                                                                    }
                                                                },
                                                                {
                                                                    'match': {
                                                                        'properties.tissue': 'breast'
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
    t.equal(JSON.stringify(main_1.toElasticQuery(complexTree)), JSON.stringify(ES1));
});
var emptyQuery = {
    'query': {
        'match_all': {}
    }
};
test('Handle null requests', function (t) {
    t.plan(1);
    t.deepEquals(emptyQuery, main_1.toElasticQuery(null));
});
test('Exact queries need to use match_phrase', function (t) {
    t.plan(1);
    var str = '"breast cancer"';
    var tree = main_1.parseString(str);
    var query = main_1.toElasticQuery(tree);
    t.deepEqual(query, { query: { match_phrase: { _all: 'breast cancer' } } });
});
test('Use match_phrase for filters with space too', function (t) {
    t.plan(1);
    var str = 'title:"breast cancer"';
    var tree = main_1.parseString(str);
    var query = main_1.toElasticQuery(tree);
    t.deepEqual(query, { query: { match_phrase: { title: 'breast cancer' } } });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxhc3RpYy1zZXJpYWxpemVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvc2VyaWFsaXplcnMvZWxhc3RpYy1zZXJpYWxpemVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBRTdCLHFCQUEwQyxZQUFZLENBQUMsQ0FBQTtBQUl2RDs7OztHQUlHO0FBRUgsSUFBTSxHQUFHLEdBQUc7SUFDVixPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUU7WUFDTixNQUFNLEVBQUU7Z0JBQ047b0JBQ0UsY0FBYyxFQUFFO3dCQUNkLE1BQU0sRUFBRSxlQUFlO3FCQUN4QjtpQkFDRjtnQkFDRDtvQkFDRSxNQUFNLEVBQUU7d0JBQ04sVUFBVSxFQUFFOzRCQUNWO2dDQUNFLE1BQU0sRUFBRTtvQ0FDTixRQUFRLEVBQUU7d0NBQ1I7NENBQ0UsT0FBTyxFQUFFO2dEQUNQLE9BQU8sRUFBRSxTQUFTOzZDQUNuQjt5Q0FDRjt3Q0FDRDs0Q0FDRSxNQUFNLEVBQUU7Z0RBQ04sUUFBUSxFQUFFO29EQUNSO3dEQUNFLGNBQWMsRUFBRTs0REFDZCxPQUFPLEVBQUUsZ0NBQWdDO3lEQUMxQztxREFDRjtvREFDRDt3REFDRSxNQUFNLEVBQUU7NERBQ04sTUFBTSxFQUFFO2dFQUNOO29FQUNFLE9BQU8sRUFBRTt3RUFDUCxRQUFRLEVBQUUsTUFBTTtxRUFDakI7aUVBQ0Y7Z0VBQ0Q7b0VBQ0UsT0FBTyxFQUFFO3dFQUNQLG1CQUFtQixFQUFFLFFBQVE7cUVBQzlCO2lFQUNGOzZEQUNGO3lEQUNGO3FEQUNGO2lEQUNGOzZDQUNGO3lDQUNGO3FDQUNGO2lDQUNGOzZCQUNGO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUFzQztJQUNyRCxLQUFLLEVBQUUsS0FBSztJQUNaLElBQUksRUFBRTtRQUNKLElB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