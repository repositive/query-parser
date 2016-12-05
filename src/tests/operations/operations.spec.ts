import * as test from 'tape';
import {BTree} from '../../main/b-tree/index';
import {BooleanOperator, BTreeLeaf} from '../../main/b-exp-tree';
import {insertFilter} from '../../main/operations/insert-filter'


const simpleTree1: BTreeLeaf = {
  text: 'cancer'
};

const simpleTree2: BTree<BooleanOperator, BTreeLeaf> = {
  value: {
    operator: 'AND'
  },
  left: {
    text: 'cancer'
  },
  right: {
    text: 'RNA-Seq',
    predicate: 'assay'
  }
};

const tree1: BTree<BooleanOperator, BTreeLeaf> = {
  value: {
    operator: 'AND'
  },
  left: {
    text: 'glaucoma'
  },
  right: {
    value: {
      operator: 'AND'
    },
    left: <BTree<BooleanOperator, BTreeLeaf>> {
      value: {
        operator: 'NOT'
      },
      right: {
        predicate: 'assay',
        text: 'X'
      }
    },
    right: {
      predicate: 'collection',
      text: 'X'
    }
  }
};

const tree2: BTree<BooleanOperator, BTreeLeaf> = {
  value: {
    operator: 'AND'
  },
  left: {
    text: 'glaucoma'
  },
  right: {
    value: {
      operator: 'AND'
    },
    left: <BTree<BooleanOperator, BTreeLeaf>> {
      value: {
        operator: 'NOT'
      },
      right: {
        predicate: 'assay',
        text: 'RNA-Seq'
      }
    },
    right: {
      predicate: 'collection',
      text: 'X'
    }
  }
};


const tree3: BTree<BooleanOperator, BTreeLeaf> =
{
  value: {
    operator: 'AND'
  },
  left: {
    predicate: 'access',
    text: 'open'
  },
  right: {
    value: {
      operator: 'AND'
    },
    left: {
      text: 'glaucoma'
    },
    right: <BTree<BooleanOperator, BTreeLeaf>> {
      value: {
        operator: 'AND'
      },
      left: {
        value: {
          operator: 'NOT'
        },
        right: {
          predicate: 'assay',
          text: 'RNA-Seq'
        }
      },
      right: {
        predicate: 'collection',
        text: 'X'
      }
    }
  }
};

test.skip('add filter to simple tree', t => {
  t.plan(1);
  t.deepEquals(insertFilter('assay', 'RNA-Seq', simpleTree1), simpleTree2);
});

test.skip('replace existing filters', t => {
  t.plan(1);
  t.deepEquals(insertFilter('assay', 'RNA-Seq', tree1), tree2);
});

test.skip('Add filters to complex tree', t => {
  t.plan(1);
  t.deepEquals(insertFilter('assay', 'RNA-Seq', tree1), tree2);
});


console.log(JSON.stringify(insertFilter('assay', 'Y', tree1), null, 2));
console.log(JSON.stringify(insertFilter('test', 'Y', tree1), null, 2));
