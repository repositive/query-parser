import * as test from 'tape';
import {BTree} from '../../main/b-tree/index';
import {SearchNode} from '../../main/b-exp-tree';
import {insertFilter} from '../../main/operations/insert-filter'


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
          predicate: 'assay',
          text: 'X'
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

const tree2:BTree<SearchNode> = {
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
          predicate: 'assay',
          text: 'RNA-Seq'
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


const tree3:BTree<SearchNode> =
{
  value: {
    operator: 'AND'
  },
  left: {
    value: {
      predicate: 'access',
      text: 'open'
    }
  },
  right: {
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
            predicate: 'assay',
            text: 'RNA-Seq'
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
  }
};

test('add filter to simple tree', t => {
  t.plan(1);
  t.deepEquals(insertFilter('assay', 'RNA-Seq', simpleTree1), simpleTree2);
});

test('replace existing filters', t => {
  t.plan(1);
  t.deepEquals(insertFilter('assay', 'RNA-Seq', tree1), tree2);
});

test('Add filters to complex tree', t => {
  t.plan(1);
  t.deepEquals(insertFilter('assay', 'RNA-Seq', tree1), tree2);
});


console.log(JSON.stringify(insertFilter('assay', 'Y', tree1), null, 2));
console.log(JSON.stringify(insertFilter('test', 'Y', tree1), null, 2));
