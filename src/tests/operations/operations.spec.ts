import * as test from 'tape';
import {BTree} from '../../main/b-tree/index';
import {BooleanOperator, BTreeLeaf, BBTree} from '../../main/b-exp-tree';
import {insertFilter} from '../../main/operations/insert-filter'
import {getPath, addFilter, removeNodeByID, removeFilter} from '../../main/operations/filters';


const simpleTree1: BTreeLeaf = {
  text: 'cancer'
};

const simpleTree2: BTree<BooleanOperator, BTreeLeaf> = {
  value: 'AND',
  left: {
    text: 'cancer'
  },
  right: {
    text: 'RNA-Seq',
    predicate: 'assay'
  }
};

const tree1: BTree<BooleanOperator, BTreeLeaf> = {
  value: 'AND',
  left: {
    text: 'glaucoma'
  },
  right: {
    value: 'AND',
    left: <BTree<BooleanOperator, BTreeLeaf>> {
      value: 'NOT',
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
  value: 'AND',
  left: {
    text: 'glaucoma'
  },
  right: {
    value: 'AND',
    left: <BTree<BooleanOperator, BTreeLeaf>> {
      value: 'NOT',
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
    value: 'AND',
    left: {
      predicate: 'access',
      text: 'open'
    },
    right: {
      value: 'AND',
      left: {
        text: 'glaucoma'
      },
      right: <BTree<BooleanOperator, BTreeLeaf>> {
        value: 'AND',
        left: {
          value: 'NOT',
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

const wIDsRemoved: BBTree = {
  _id: '1',
  value: 'AND',
  left: {
    text: 'glaucoma'
  },
  right: {
    _id: '2',
    value: 'AND',
    left: {
      _id: '3',
      value: 'NOT',
      left: null,
      right: {
        _id: '5',
        predicate: 'assay',
        text: 'X'
      }
    },
    right: {
      _id: '4',
      predicate: 'collection',
      text: 'X'
    }
  }
};

const treeWithIDs: BBTree = {
  _id: '1',
  value: 'AND',
  left: {
    _id: '7',
    text: 'glaucoma'
  },
  right: {
    _id: '2',
    value: 'AND',
    left: {
      _id: '3',
      value: 'NOT',
      left: null,
      right: {
        _id: '8',
        value: 'AND',
        left: {
          _id: '9',
          text: 'new!'
        },
        right: {
          _id: '5',
          predicate: 'assay',
          text: 'X'
        }
      }
    },
    right: {
      _id: '4',
      predicate: 'collection',
      text: 'X'
    }
  }
};

const twoOrs: BBTree = {
  _id: '1',
  value: 'AND',
  left: {
    _id: '2',
    value: 'OR',
    left: {
      _id: '3',
      text: 'X'
    },
    right: {
      _id: '4',
      text: 'Y'
    }
  },
  right: {
    _id: '5',
    value: 'OR',
    left: {
      _id: '6',
      text: 'Z'
    },
    right: {
      _id: '7',
      text: 'A'
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

test('Should return path to id', t => {
  t.plan(3);
  t.deepEquals(['1','2','3'], getPath(treeWithIDs, '3'));
  t.deepEquals(['1','2','3','8','5'], getPath(treeWithIDs, '5'));
  t.deepEquals(['1','5','7'], getPath(twoOrs, '7'));
});

test.skip('Add predicates', t => {
  t.plan(1);
  const res = addFilter(treeWithIDs, 'assay', 'Y');
  t.deepEquals(treeWithIDs, res);
});

test.skip('Remove nodes', t => {
  t.plan(1);
  const res = removeNodeByID(treeWithIDs, '7');
  t.deepEquals(treeWithIDs, res);
});

test.skip('remove filters', t => {
  t.plan(1);
  const res = removeFilter(treeWithIDs, 'collection', 'X');
  console.log(JSON.stringify(res,null,2));
  t.deepEquals(treeWithIDs, res);
});
