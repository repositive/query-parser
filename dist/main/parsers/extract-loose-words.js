"use strict";
var ramda_1 = require('ramda');
function extractLooseWords(input, acc) {
    if (acc === void 0) { acc = []; }
    return ramda_1.concat(acc, input.split(' ').filter(function (k) { return k; }).map(function (w) {
        var from = input.indexOf(w);
        return {
            type: 'term',
            from: from,
            to: from + w.length,
            term: w
        };
    }));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractLooseWords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1sb29zZS13b3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL3BhcnNlcnMvZXh0cmFjdC1sb29zZS13b3Jkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQXFCLE9BQU8sQ0FBQyxDQUFBO0FBRzdCLDJCQUEwQyxLQUFhLEVBQUUsR0FBaUI7SUFBakIsbUJBQWlCLEdBQWpCLFFBQWlCO0lBQ3hFLE1BQU0sQ0FBQyxjQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxFQUFELENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7UUFDdEQsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQVM7WUFDYixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTTtZQUNuQixJQUFJLEVBQUUsQ0FBQztTQUNSLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQVZEO21DQVVDLENBQUEifQ==