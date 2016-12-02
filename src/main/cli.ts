
import {parseString as parser} from './parsers/query-parser';
import {toBoolString as serializer} from './serializers/string-serializer';

const parsed = parser('cancer (brain OR lung)');

console.log(serializer(parsed));
