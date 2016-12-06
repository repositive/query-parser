"use strict";
const ramda_1 = require('ramda');
function extractNOT(input, tokens = [], i = 0) {
    const match = input.match(/(^NOT\s|\sNOT\s)/);
    if (match) {
        const from = match[0].startsWith('N') ? match.index : match.index + 1; // Space in front of NOT -> leave space
        const to = match.index + match[0].length;
        const newTokens = ramda_1.concat(tokens, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1OT1QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9wYXJzZXJzL2V4dHJhY3QtTk9ULnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx3QkFBcUIsT0FBTyxDQUFDLENBQUE7QUFFN0Isb0JBQW1DLEtBQWEsRUFBRSxNQUFNLEdBQVksRUFBRSxFQUFFLENBQUMsR0FBVyxDQUFDO0lBRW5GLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU5QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsdUNBQXVDO1FBQzlHLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN6QyxNQUFNLFNBQVMsR0FBRyxjQUFNLENBQUMsTUFBTSxFQUFZLENBQUM7Z0JBQzFDLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQztnQkFDZCxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjthQUN2RCxDQUFDLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztBQUNILENBQUM7QUFsQkQ7NEJBa0JDLENBQUEifQ==