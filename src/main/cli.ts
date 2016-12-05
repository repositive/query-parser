
import {parseString as parser} from './parsers/query-parser';
import {toBoolString as serializer} from './serializers/string-serializer';
import BTree from './b-tree';

//const parsed = parser('cancer NOT (brain OR lung)');

const left = new BTree('left');
const tree = new BTree('plus', left);
const parent = new BTree('NOT', null, tree);
console.log(parent);
