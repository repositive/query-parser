import * as test from 'tape';
import {toBoolString} from "../../main/serializers/string-serializer";
import {BTree, SearchNode} from "../../main/b-tree";

/*
 ############################################################################
 ###################            String serializer         ###################
 ############################################################################
 */

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

const str = '("breast cancer" AND NOT (assay:RNA-Seq OR (assay:RNA-seq OR (access:Open AND properties.tissue:breast))))';

test('String - Complex Tree', function (t) {
  t.plan(1);
  t.equal(toBoolString(complexTree), str);
});