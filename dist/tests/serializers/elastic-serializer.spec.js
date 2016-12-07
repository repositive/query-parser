"use strict";
var test = require('tape');
var elastic_seralizer_1 = require("../../main/serializers/elastic-seralizer");
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
                    text: 'RNA-seq'
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
    t.equal(JSON.stringify(elastic_seralizer_1.toElasticQuery(complexTree)), JSON.stringify(ES1));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxhc3RpYy1zZXJpYWxpemVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvc2VyaWFsaXplcnMvZWxhc3RpYy1zZXJpYWxpemVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBQzdCLGtDQUE2QiwwQ0FBMEMsQ0FBQyxDQUFBO0FBSXhFOzs7O0dBSUc7QUFFSCxJQUFNLEdBQUcsR0FBRztJQUNWLE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRTtZQUNOLE1BQU0sRUFBRTtnQkFDTjtvQkFDRSxPQUFPLEVBQUU7d0JBQ1AsTUFBTSxFQUFFLGVBQWU7cUJBQ3hCO2lCQUNGO2dCQUNEO29CQUNFLE1BQU0sRUFBRTt3QkFDTixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsTUFBTSxFQUFFO29DQUNOLFFBQVEsRUFBRTt3Q0FDUjs0Q0FDRSxPQUFPLEVBQUU7Z0RBQ1AsT0FBTyxFQUFFLFNBQVM7NkNBQ25CO3lDQUNGO3dDQUNEOzRDQUNFLE1BQU0sRUFBRTtnREFDTixRQUFRLEVBQUU7b0RBQ1I7d0RBQ0UsT0FBTyxFQUFFOzREQUNQLE9BQU8sRUFBRSxTQUFTO3lEQUNuQjtxREFDRjtvREFDRDt3REFDRSxNQUFNLEVBQUU7NERBQ04sTUFBTSxFQUFFO2dFQUNOO29FQUNFLE9BQU8sRUFBRTt3RUFDUCxRQUFRLEVBQUUsTUFBTTtxRUFDakI7aUVBQ0Y7Z0VBQ0Q7b0VBQ0UsT0FBTyxFQUFFO3dFQUNQLG1CQUFtQixFQUFFLFFBQVE7cUVBQzlCO2lFQUNGOzZEQUNGO3lEQUNGO3FEQUNGO2lEQUNGOzZDQUNGO3lDQUNGO3FDQUNGO2lDQUNGOzZCQUNGO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUFzQztJQUNyRCxLQUFLLEVBQUUsS0FBSztJQUNaLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxlQUFlO0tBQ3RCO0lBQ0QsS0FBSyxFQUFxQztRQUN4QyxLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBcUM7WUFDeEMsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUU7Z0JBQ0osU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLElBQUksRUFBRSxTQUFTO2FBQ2hCO1lBQ0QsS0FBSyxFQUFzQztnQkFDekMsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFO29CQUNKLFNBQVMsRUFBRSxPQUFPO29CQUNsQixJQUFJLEVBQUUsU0FBUztpQkFDaEI7Z0JBQ0QsS0FBSyxFQUFzQztvQkFDekMsS0FBSyxFQUFFLEtBQUs7b0JBQ1osSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSxRQUFRO3dCQUNuQixJQUFJLEVBQUUsTUFBTTtxQkFDYjtvQkFDRCxLQUFLLEVBQUU7d0JBQ0wsU0FBUyxFQUFFLG1CQUFtQjt3QkFDOUIsSUFBSSxFQUFFLFFBQVE7cUJBQ2Y7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLFVBQVUsQ0FBQztJQUNuRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtDQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQyxDQUFDLENBQUMifQ==