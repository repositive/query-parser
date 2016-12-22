import {parse} from './parser';
import {BBTree} from './b-exp-tree';
import {removeFilter} from './operations/filters';

// const str = 'prostate cancer (assay:"Microarray Gene Expression" OR assay:RNA-Seq OR assay:ChIP-Seq OR assay:ChIP-seq) AND African';

const str = ' (test) ';

const res = parse(str);

console.log(res);