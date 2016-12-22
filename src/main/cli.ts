import {parse} from './parser';
import {BBTree} from './b-exp-tree';
import {removeFilter} from './operations/filters';

const str = "assay:RNA-Seq cancer breast"

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

console.log(JSON.stringify(
  removeFilter(treeWithIDs, 'collection', 'X'), null, 2));
