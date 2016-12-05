
import {parseString as parser} from './parsers/query-parser';
import {toBoolString as serializer} from './serializers/string-serializer';
import BTree from './b-tree';

//const parsed = parser('cancer NOT (brain OR lung)');

console.log(new BTree('plus') instanceof BTree);
