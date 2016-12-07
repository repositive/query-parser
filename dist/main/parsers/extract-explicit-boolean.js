"use strict";
var ramda_1 = require('ramda');
function extractExplicitBoolean(input, tokens, i) {
    if (tokens === void 0) { tokens = []; }
    if (i === void 0) { i = 0; }
    var match = input.match(/ AND | OR /);
    if (match) {
        var from = match.index;
        var to = from + match[0].length;
        var newTokens = ramda_1.concat(tokens, [{
                type: 'bo',
                from: from + i,
                to: to + i,
                term: input.substring(from + 1, to - 1)
            }]);
        return extractExplicitBoolean(input.substring(to), newTokens, to + i);
    }
    else {
        return tokens;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractExplicitBoolean;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1leHBsaWNpdC1ib29sZWFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9leHRyYWN0LWV4cGxpY2l0LWJvb2xlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFxQixPQUFPLENBQUMsQ0FBQTtBQUc3QixnQ0FBK0MsS0FBYSxFQUFFLE1BQW9CLEVBQUUsQ0FBYTtJQUFuQyxzQkFBb0IsR0FBcEIsV0FBb0I7SUFBRSxpQkFBYSxHQUFiLEtBQWE7SUFFL0YsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ1YsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxJQUFNLFNBQVMsR0FBRyxjQUFNLENBQUMsTUFBTSxFQUFZLENBQUM7Z0JBQzFDLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQztnQkFDZCxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDO0FBakJEO3dDQWlCQyxDQUFBIn0=