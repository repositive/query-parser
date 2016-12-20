"use strict";
var ramda_1 = require('ramda');
/**
 * Created by dennis on 01/12/2016.
 */
function extractPredicates(input, acc) {
    if (acc === void 0) { acc = []; }
    var matches = input.match(/\S+\s?:\s?(['"])((?:(?!\1).)+)\1|(\S+\s?:\s?[\w\-\_]+)/g);
    if (!matches)
        return acc;
    var extract = function (matches, string, offset, acc) {
        if (offset === void 0) { offset = 0; }
        if (acc === void 0) { acc = []; }
        var match = matches[0];
        if (!match)
            return acc;
        var str = match.trim();
        var temp = str.split(':');
        return extract(matches.slice(1), string.slice(match.length), offset + match.length, ramda_1.append({
            type: 'filter',
            from: string.indexOf(str) + offset,
            to: string.indexOf(str) + str.length + offset,
            term: temp[1].trim().replace(/\"/g, ''),
            predicate: temp[0].trim()
        }, acc));
    };
    return extract(matches, input);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractPredicates;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1wcmVkaWNhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9leHRyYWN0LXByZWRpY2F0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHNCQUFpQyxPQUFPLENBQUMsQ0FBQTtBQUN6Qzs7R0FFRztBQUVILDJCQUEwQyxLQUFhLEVBQUUsR0FBaUI7SUFBakIsbUJBQWlCLEdBQWpCLFFBQWlCO0lBRXhFLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztJQUN2RixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFFekIsSUFBTSxPQUFPLEdBQUcsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQVUsRUFBRSxHQUFpQjtRQUE3QixzQkFBVSxHQUFWLFVBQVU7UUFBRSxtQkFBaUIsR0FBakIsUUFBaUI7UUFDN0QsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN2QixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUMxQixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFDckIsY0FBTSxDQUFTO1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNO1lBQ2xDLEVBQUUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTTtZQUM3QyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO1NBQzFCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUF2QkQ7bUNBdUJDLENBQUEifQ==