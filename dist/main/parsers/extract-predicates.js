"use strict";
var ramda_1 = require('ramda');
/**
 * Created by dennis on 01/12/2016.
 */
function extractPredicates(input, acc) {
    if (acc === void 0) { acc = []; }
    var matches = input.match(/\s*(\S+)\s?:\s?((\".*\")|(\S+))\s*/g);
    if (!matches)
        return acc;
    var extract = function (m) {
        var str = m.trim();
        var temp = str.split(':');
        return {
            type: 'filter',
            from: input.indexOf(str),
            to: input.indexOf(str) + str.length,
            term: temp[1].trim().replace(/\"/g, ''),
            predicate: temp[0].trim()
        };
    };
    return ramda_1.concat(acc, matches.map(extract));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractPredicates;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1wcmVkaWNhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9leHRyYWN0LXByZWRpY2F0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHNCQUFxQixPQUFPLENBQUMsQ0FBQTtBQUM3Qjs7R0FFRztBQUVILDJCQUEwQyxLQUFhLEVBQUUsR0FBaUI7SUFBakIsbUJBQWlCLEdBQWpCLFFBQWlCO0lBRXhFLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFFekIsSUFBTSxPQUFPLEdBQUcsVUFBQSxDQUFDO1FBQ2YsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFTO1lBQ2IsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDeEIsRUFBRSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU07WUFDbkMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN2QyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtTQUMxQixDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsTUFBTSxDQUFDLGNBQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFsQkQ7bUNBa0JDLENBQUEifQ==