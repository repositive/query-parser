"use strict";
var ramda_1 = require('ramda');
var tail = ramda_1.tail;
function extractQuotedWord(input, acc) {
    if (acc === void 0) { acc = ''; }
    var h = ramda_1.head(input);
    if (h === '') {
        throw new Error("No closing quote in " + acc);
    }
    else if (h === '"') {
        return acc;
    }
    else {
        return extractQuotedWord(tail(input), acc + h);
    }
}
function extractQuotedWords(input, acc) {
    if (acc === void 0) { acc = []; }
    var h = ramda_1.head(input);
    if (h === '') {
        return acc;
    }
    else if (h === '"') {
        var word = extractQuotedWord(tail(input));
        acc.push("\"" + word + "\"");
        return extractQuotedWords(input.substring(word.length + 2), acc);
    }
    else {
        return extractQuotedWords(tail(input), acc);
    }
}
function extractQuoted(input, acc) {
    if (acc === void 0) { acc = []; }
    var words = extractQuotedWords(input);
    return ramda_1.concat(acc, words.map(function (w) {
        var from = input.indexOf(w);
        return {
            type: 'term',
            from: from,
            to: from + w.length,
            term: w.replace(/\"/g, '')
        };
    }));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractQuoted;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1xdW90ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9wYXJzZXJzL2V4dHJhY3QtcXVvdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBMEMsT0FBTyxDQUFDLENBQUE7QUFHbEQsSUFBTSxJQUFJLEdBQVEsWUFBSyxDQUFDO0FBRXhCLDJCQUEyQixLQUFhLEVBQUUsR0FBZ0I7SUFBaEIsbUJBQWdCLEdBQWhCLFFBQWdCO0lBQ3hELElBQU0sQ0FBQyxHQUFHLFlBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXVCLEdBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDSCxDQUFDO0FBRUQsNEJBQTRCLEtBQWEsRUFBRSxHQUFrQjtJQUFsQixtQkFBa0IsR0FBbEIsUUFBa0I7SUFDM0QsSUFBTSxDQUFDLEdBQUcsWUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBTSxJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFJLElBQUksT0FBRyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7QUFDSCxDQUFDO0FBRUQsdUJBQXNDLEtBQWEsRUFBRSxHQUFpQjtJQUFqQixtQkFBaUIsR0FBakIsUUFBaUI7SUFDcEUsSUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFeEMsTUFBTSxDQUFDLGNBQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7UUFDN0IsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUM7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTTtZQUNuQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1NBQzNCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQVpEOytCQVlDLENBQUEifQ==