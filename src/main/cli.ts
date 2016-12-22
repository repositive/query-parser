import {parse} from './parser';
import {removeFilter} from './operations/filters';

const str = "assay:RNA-Seq cancer breast"

console.log(JSON.stringify(
  removeFilter(
    parse(str)
  , 'assay', 'RNA-Seq')
  , null, 2));
