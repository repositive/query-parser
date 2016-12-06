"use strict";
var ramda_1 = require('ramda');
function extractImplicitBoolean(input, tokens, i) {
    if (tokens === void 0) { tokens = []; }
    if (i === void 0) { i = 0; }
    var next = input.indexOf(' ');
    if (next !== -1) {
        return extractImplicitBoolean(input.replace(/\s+/g, ' ').substring(next + 1), ramda_1.append({ type: 'bo', from: next + i, to: next + 1 + i, term: 'AND' }, tokens), next + 1 + i);
    }
    else {
        return tokens;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractImplicitBoolean;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1pbXBsaWNpdC1ib29sZWFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9leHRyYWN0LWltcGxpY2l0LWJvb2xlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFxQixPQUFPLENBQUMsQ0FBQTtBQUc3QixnQ0FBK0MsS0FBYSxFQUFFLE1BQW9CLEVBQUUsQ0FBYTtJQUFuQyxzQkFBb0IsR0FBcEIsV0FBb0I7SUFBRSxpQkFBYSxHQUFiLEtBQWE7SUFDL0YsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLGNBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNLLENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztBQUNILENBQUM7QUFSRDt3Q0FRQyxDQUFBIn0=