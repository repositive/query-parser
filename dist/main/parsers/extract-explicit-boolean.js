"use strict";
const ramda_1 = require('ramda');
function extractExplicitBoolean(input, tokens = [], i = 0) {
    const match = input.match(/ AND | OR /);
    if (match) {
        const from = match.index;
        const to = from + match[0].length;
        const newTokens = ramda_1.concat(tokens, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1leHBsaWNpdC1ib29sZWFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9leHRyYWN0LWV4cGxpY2l0LWJvb2xlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQixPQUFPLENBQUMsQ0FBQTtBQUc3QixnQ0FBK0MsS0FBYSxFQUFFLE1BQU0sR0FBWSxFQUFFLEVBQUUsQ0FBQyxHQUFXLENBQUM7SUFFL0YsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixNQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxNQUFNLFNBQVMsR0FBRyxjQUFNLENBQUMsTUFBTSxFQUFZLENBQUM7Z0JBQzFDLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQztnQkFDZCxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDO0FBakJEO3dDQWlCQyxDQUFBIn0=