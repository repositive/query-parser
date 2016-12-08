import * as test from 'tape';
import {BTree, isBTree} from '../../main/b-tree/index';
import {BooleanOperator, BTreeLeaf, BBTree, isTerm, isFilter, Filter} from '../../main/b-exp-tree';
import {getPath, addFilter, removeNodeByID, removeFilter, getFilters} from '../../main/operations/filters';
import {toBoolString} from "../../main/serializers/string-serializer";
import {parseString} from "../../main/parsers/query-parser";


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
  t.deepEquals(addFilter(simpleTree1, 'assay', 'RNA-Seq'), simpleTree2);
});

test.skip('replace existing filters', t => {
  t.plan(1);
  t.deepEquals(addFilter(tree1, 'assay', 'RNA-Seq'), tree2);
});

test.skip('Add filters to complex tree', t => {
  t.plan(1);
  t.deepEquals(addFilter(tree1, 'assay', 'RNA-Seq'), tree2);
});

test('Should return path to id', t => {
  t.plan(3);
  t.deepEquals(['1','2','3'], getPath(treeWithIDs, '3'));
  t.deepEquals(['1','2','3','8','5'], getPath(treeWithIDs, '5'));
  t.deepEquals(['1','5','7'], getPath(twoOrs, '7'));
});

test.skip('Add existing predicates', t => {
  t.plan(1);
  const res = addFilter(treeWithIDs, 'assay', 'Y');
  t.deepEquals(treeWithIDs, res);
});

function getDepth(tree: BBTree | BTreeLeaf): number {
  if (isTerm(tree)) return 1;
  if (isBTree(tree)) {
    return Math.max(1 + getDepth(tree.left), 1 + getDepth(tree.right))
  }
  return 0;
}

test('Add new predicates', t => {
  t.plan(3);
  const res = <BBTree> addFilter(treeWithIDs, 'test', 'X');
  const dres = getDepth(res);
  t.equals(dres, getDepth(treeWithIDs) + 1);
  t.assert(isFilter(res.left));
  const tree = parseString('cancer AND breast');
  const newTree = addFilter(tree, 'assay', 'RNA-Seq');
  t.equals(toBoolString(newTree), 'assay:RNA-Seq cancer breast');
});

test('Remove nodes', t => {
  t.plan(1);
  const res = removeNodeByID(treeWithIDs, '7');
  t.equals(getDepth(treeWithIDs) - 1, getDepth(res));
});

test('remove filters', t => {
  t.plan(2);
  const res = <BBTree> removeFilter(treeWithIDs, 'collection', 'X');
  t.equals(getDepth(res), getDepth(treeWithIDs) - 1);
  const original = 'assay:RNA-Seq cancer breast';
  const tree = parseString(original);
  const treeString = toBoolString(tree);
  const removed = removeFilter(tree, 'assay', 'RNA-Seq');
  const removedString = toBoolString(removed);
  t.equals(removedString, 'cancer breast');
});

test('getFilters', t => {
  t.plan(1);
  const filters = getFilters(treeWithIDs);
  t.deepEquals(filters, [{
    _id: '5',
    predicate: 'assay',
    text: 'X'
  },{
    _id: '4',
    predicate: 'collection',
    text: 'X'
  }])
});

test('Adding filters to empty query', t => {
  t.plan(3);
  const emptyTree = null;
  const newTree = <Filter> addFilter(emptyTree, 'assay', 'WGS');
  t.assert(isFilter(newTree));
  t.assert(newTree.text, 'WGS');
  t.assert(newTree.predicate, 'assay');
  t.end();
});

test.skip('Adding multiple filters', t => {
  t.plan(2);
  t.end();
});
