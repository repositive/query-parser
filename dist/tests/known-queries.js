/**
 * Created by dennis on 22/12/2016.
 */
"use strict";
var parse = require('csv-parse');
var fs_1 = require("fs");
var query_parser_1 = require("../main/parsers/query-parser");
console.log('###########################################################\n');
console.log('Starting test of former queries...');
console.log('Excluding queries with unsupported characters (],[,=,*)...\n');
console.log('###########################################################\n');
var file = fs_1.readFileSync('./searches.csv');
var records = parse(file.toString(), { comment: '#', skip_empty_lines: true });
var crashes = 0;
var total = 0;
records.on('data', function (d) {
    var query = d[0];
    if (!/[\[\]=\*]/.test(query)) {
        total++;
        try {
            query_parser_1.parseString(query);
        }
        catch (e) {
            crashes++;
            console.log("Crashes: " + crashes);
        }
    }
});
records.on('end', function (d) {
    console.log("\n\n###################### Test ended! ######################\n");
    console.log("Total: " + total + "\nCrashed: " + crashes + "\n");
    console.log('###########################################################\n\n');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vd24tcXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9rbm93bi1xdWVyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOztBQUVILElBQVksS0FBSyxXQUFNLFdBQVcsQ0FBQyxDQUFBO0FBQ25DLG1CQUEyQixJQUFJLENBQUMsQ0FBQTtBQUNoQyw2QkFBMEIsOEJBQThCLENBQUMsQ0FBQTtBQUV6RCxPQUFPLENBQUMsR0FBRyxDQUFDLCtEQUErRCxDQUFDLENBQUM7QUFDN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsOERBQThELENBQUMsQ0FBQztBQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLCtEQUErRCxDQUFDLENBQUM7QUFFN0UsSUFBTSxJQUFJLEdBQUcsaUJBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVDLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDakYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNkLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUEsQ0FBQztJQUNsQixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQztZQUNILDBCQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBRTtRQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBWSxPQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQSxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUVBQWlFLENBQUMsQ0FBQztJQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVUsS0FBSyxtQkFBYyxPQUFPLE9BQUksQ0FBQyxDQUFDO0lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUVBQWlFLENBQUMsQ0FBQztBQUNqRixDQUFDLENBQUMsQ0FBQyJ9