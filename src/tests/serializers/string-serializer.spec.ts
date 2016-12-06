import * as test from 'tape';
import {toBoolString} from '../../main/serializers/string-serializer';
import {BBTree, BTreeLeaf} from '../../main/b-exp-tree';

/*
 ############################################################################
 ###################            String serializer         ###################
 ############################################################################
 */

const simpleTree1: BTreeLeaf = {
  text: 'cancer'
};

const simpleTree2: BBTree = {
  value: 'AND',
  left: {
    text: 'cancer'
  },
  right: {
    text: 'RNA-Seq',
    predicate: 'assay'
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

const tree1: BBTree = {
  value: 'AND',
  left: {
    text: 'glaucoma'
  },
  right: {
    value: 'AND',
    left: <BBTree> {
      value: 'NOT',
      right: {
        value: 'OR',
        left: {
          predicate: 'assay',
          text: 'X'
        },
        right: {
          predicate: 'assay',
          text: 'Y'
        }
      }
    },
    right: {
      predicate: 'collection',
      text: 'X'
    }
  }
};

test('Nested NOT and Boolean terms', function (t) {
  t.plan(1);
  t.equal(toBoolString(tree1), '(glaucoma AND (NOT (assay:X OR assay:Y) AND collection:X))');
});

const complexTree: BBTree = {
  value: 'AND',
  left: {
    text: 'breast cancer'
  },
  right: <BBTree> {
    value: 'NOT',
    right: <BBTree> {
      value: 'OR',
      left: {
        predicate: 'assay',
        text: 'RNA-Seq'
      },
      right: <BBTree> {
        value: 'OR',
        left: {
          predicate: 'assay',
          text: 'RNA-seq'
        },
        right: <BBTree> {
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

const str = '("breast cancer" AND NOT (assay:RNA-Seq OR (assay:RNA-seq OR (access:Open AND properties.tissue:breast))))';

test('String - Complex Tree', function (t) {
  t.plan(1);
  t.equal(toBoolString(complexTree), str);
});
