"use strict";
var ramda_1 = require('ramda');
function extractNOT(input, tokens, i) {
    if (tokens === void 0) { tokens = []; }
    if (i === void 0) { i = 0; }
    var match = input.match(/(^NOT\s|\sNOT\s)/);
    if (match) {
        var from = match[0].indexOf('N') === 0 ? match.index : match.index + 1; // Space in front of NOT -> leave space
        var to = match.index + match[0].length;
        var newTokens = ramda_1.concat(tokens, [{
                type: 'not',
                from: from + i,
                to: to + i,
                term: input.substr(from, 3) // Set explicitly to NOT??
            }]);
        return extractNOT(input.substr(to), newTokens, to + i);
    }
    else {
        return tokens;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractNOT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1OT1QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9wYXJzZXJzL2V4dHJhY3QtTk9ULnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxzQkFBcUIsT0FBTyxDQUFDLENBQUE7QUFFN0Isb0JBQW1DLEtBQWEsRUFBRSxNQUFvQixFQUFFLENBQWE7SUFBbkMsc0JBQW9CLEdBQXBCLFdBQW9CO0lBQUUsaUJBQWEsR0FBYixLQUFhO0lBRW5GLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU5QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ1YsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHVDQUF1QztRQUNqSCxJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDekMsSUFBTSxTQUFTLEdBQUcsY0FBTSxDQUFDLE1BQU0sRUFBWSxDQUFDO2dCQUMxQyxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsSUFBSSxHQUFHLENBQUM7Z0JBQ2QsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO2dCQUNWLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQywwQkFBMEI7YUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDO0FBbEJEOzRCQWtCQyxDQUFBIn0=