"use strict";
var ramda_1 = require('ramda');
/**
 * Created by dennis on 01/12/2016.
 */
function extractPredicates(input, acc) {
    if (acc === void 0) { acc = []; }
    // Split on Colons
    var list = input.slice(input.indexOf(':'));
    var predicates = [];
    // function extract(inp: string, accu: string[]) {
    //   const match = inp.match(/\s*(\S+)\s?:\s?((".+")|(\S+))\s*/)[1];
    //   if (!match) return accu;
    //   const predicate = match[1];
    //   const rest = match[2];
    //   const text = rest.match(/(['"])((?:(?!\1).)*)\1/);
    // }
    // Split on first color
    // const firstHalf = input.substring(0, input.indexOf(':'));
    // const secondHalf = input.slice(input.indexOf(':') + 1);
    // Extract predicate
    // Extract text
    // console.log(input);
    // const quotes = /(['"])((?:(?!\1).)*)\1/;
    //
    var matches = input.match(/\S+\s?:\s?(['"])((?:(?!\1).)+)\1|(\S+\s?:\s?[\w\-\_]+)/g);
    console.log("Matches: " + matches + "\n\n");
    if (!matches)
        return acc;
    var extract = function (match, offset) {
        var str = match.trim();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1wcmVkaWNhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9leHRyYWN0LXByZWRpY2F0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHNCQUFpQyxPQUFPLENBQUMsQ0FBQTtBQUN6Qzs7R0FFRztBQUVILDJCQUEwQyxLQUFhLEVBQUUsR0FBaUI7SUFBakIsbUJBQWlCLEdBQWpCLFFBQWlCO0lBR3hFLGtCQUFrQjtJQUNsQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFJcEIsa0RBQWtEO0lBQ2xELG9FQUFvRTtJQUNwRSw2QkFBNkI7SUFDN0IsZ0NBQWdDO0lBQ2hDLDJCQUEyQjtJQUMzQix1REFBdUQ7SUFDdkQsSUFBSTtJQUVKLHVCQUF1QjtJQUN2Qiw0REFBNEQ7SUFDNUQsMERBQTBEO0lBQzFELG9CQUFvQjtJQUlwQixlQUFlO0lBRWYsc0JBQXNCO0lBQ3RCLDJDQUEyQztJQUMzQyxFQUFFO0lBQ0YsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0lBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBWSxPQUFPLFNBQU0sQ0FBQyxDQUFDO0lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUV6QixJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQUssRUFBRSxNQUFNO1FBQzVCLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBUztZQUNiLElBQUksRUFBRSxRQUFRO1lBQ2QsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3hCLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNO1lBQ25DLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDdkMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7U0FDMUIsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxjQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBOUNEO21DQThDQyxDQUFBIn0=