/**
 * Created by dennis on 22/12/2016.
 */

import * as parse from 'csv-parse';
import {readFileSync} from "fs";
import {parseString} from "../main/parsers/query-parser";

console.log('###########################################################\n');
console.log('Starting test of former queries...');
console.log('Excluding queries with unsupported characters (],[,=,*)...\n');
console.log('###########################################################\n');

const file = readFileSync('./searches.csv');
const records = parse(file.toString(), { comment: '#', skip_empty_lines: true });
let crashes = 0;
let total = 0;
records.on('data', d => {
  const query = d[0];
  if (!/[\[\]=\*]/.test(query)) {
    total++;
    try {
      parseString(query);
    } catch (e) {
      crashes++;
      console.log(`Crashes: ${crashes}`);
    }
  }
});

records.on('end', d => {
  console.log(`\n\n###################### Test ended! ######################\n`);
  console.log(`Total: ${total}\nCrashed: ${crashes}\n`);
  console.log('###########################################################\n\n');
});
