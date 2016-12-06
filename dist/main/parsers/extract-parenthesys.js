"use strict";
var ramda_1 = require('ramda');
var tail = ramda_1.tail;
function extractParenthesysContent(input, acc) {
    if (acc === void 0) { acc = ''; }
    var h = ramda_1.head(input);
    if (h === '') {
        throw new Error("No closing parenthesys in " + input);
    }
    else if (h === ')') {
        return acc;
    }
    else if (h === '(') {
        var nested = extractParenthesysContent(tail(input));
        return extractParenthesysContent(input.substring(nested.length + 1), acc + ("(" + nested + ")"));
    }
    else {
        return extractParenthesysContent(tail(input), acc + h);
    }
}
function extractParenthesysGroups(input, groups) {
    if (groups === void 0) { groups = []; }
    if (input) {
        var start = input.indexOf('(');
        if (start !== -1) {
            var next = extractParenthesysContent(input.substring(start + 1));
            return extractParenthesysGroups(input.substring(start + next.length + 1), ramda_1.concat(groups, [next]));
        }
        else {
            return groups;
        }
    }
    else {
        return groups;
    }
}
function extractParenthesys(input, acc) {
    if (acc === void 0) { acc = []; }
    var groups = extractParenthesysGroups(input);
    return ramda_1.concat(acc, groups.map(function (g) {
        var from = input.indexOf("(" + g + ")");
        return {
            type: 'group',
            from: from,
            to: from + g.length + 2,
            term: g
        };
    }));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractParenthesys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1wYXJlbnRoZXN5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL3BhcnNlcnMvZXh0cmFjdC1wYXJlbnRoZXN5cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQTBDLE9BQU8sQ0FBQyxDQUFBO0FBR2xELElBQU0sSUFBSSxHQUFRLFlBQUssQ0FBQztBQUV4QixtQ0FBbUMsS0FBYSxFQUFFLEdBQWdCO0lBQWhCLG1CQUFnQixHQUFoQixRQUFnQjtJQUNoRSxJQUFNLENBQUMsR0FBRyxZQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUE2QixLQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRW5CLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQU0sTUFBTSxHQUFHLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLE9BQUksTUFBTSxPQUFHLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0FBQ0gsQ0FBQztBQUVELGtDQUFrQyxLQUFhLEVBQUUsTUFBcUI7SUFBckIsc0JBQXFCLEdBQXJCLFdBQXFCO0lBQ3BFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDVixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBTSxJQUFJLEdBQUcseUJBQXlCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxjQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztBQUNILENBQUM7QUFFRCw0QkFBMkMsS0FBYSxFQUFFLEdBQWlCO0lBQWpCLG1CQUFpQixHQUFqQixRQUFpQjtJQUN6RSxJQUFNLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsY0FBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztRQUM3QixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQUksQ0FBQyxNQUFHLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQVM7WUFDYixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDdkIsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFYRDtvQ0FXQyxDQUFBIn0=