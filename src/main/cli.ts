/**
 * Created by dennis on 28/11/2016.
 */
let argv = require('minimist')(process.argv.slice(2));
import { toBoolString } from './index';

process.stdout.write(toBoolString(JSON.parse(argv.query)));

// console.log(toBoolString({
//   $and: [
//     {text: 'cancer'},
//     {assay: 'X'},
//     {$or: [
//       {collection: 'Y'},
//       {collection: 'Z'}
//     ]}
//   ]
// }));