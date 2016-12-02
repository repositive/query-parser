import {BTree, SearchNode} from '../../main/b-tree/index';
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

console.log(JSON.stringify(insertFilter('assay', 'Y', tree1), null, 2));
console.log(JSON.stringify(insertFilter('test', 'Y', tree1), null, 2));