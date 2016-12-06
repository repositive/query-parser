"use strict";
var ramda_1 = require('ramda');
var extract_parenthesys_1 = require('./extract-parenthesys');
var extract_predicates_1 = require('./extract-predicates');
var extract_loose_words_1 = require('./extract-loose-words');
var extract_explicit_boolean_1 = require('./extract-explicit-boolean');
var extract_implicit_boolean_1 = require('./extract-implicit-boolean');
var extract_quoted_1 = require('./extract-quoted');
var extract_NOT_1 = require('./extract-NOT');
var parsers = [
    extract_parenthesys_1.default,
    extract_predicates_1.default,
    extract_quoted_1.default,
    extract_NOT_1.default,
    extract_explicit_boolean_1.default,
    extract_implicit_boolean_1.default,
    extract_loose_words_1.default
];
function isContained(container, contained) {
    return container.from <= contained.from && container.to >= contained.to;
}
function rangeSplitter(input, split) {
    var s = ramda_1.head(split);
    if (s) {
        var newInput = input.map(function (r) {
            if (isContained(r, s)) {
                return [{ from: r.from, to: s.from }, { from: s.to, to: r.to }].filter(function (rng) { return rng.from !== rng.to; });
            }
            else {
                return [r];
            }
        });
        return rangeSplitter(ramda_1.flatten(newInput), ramda_1.tail(split));
    }
    else {
        return input;
    }
}
function tokenStripper(input, tokens) {
    var inputRange = { from: 0, to: input.length };
    var ranges = rangeSplitter([inputRange], tokens);
    return ranges.map(function (r) {
        var str = input.substring(r.from, r.to);
        return {
            from: r.from,
            to: r.to,
            term: str
        };
    }).filter(function (t) { return t.term !== ''; });
}
exports.tokenStripper = tokenStripper;
function tokenizer(input) {
    return parsers.reduce(function (tokens, p) {
        var ranges = tokenStripper(input, tokens);
        return ramda_1.flatten(ramda_1.concat(tokens, ranges.map(function (r) {
            var newTokens = p(r.term);
            return newTokens.map(function (t) {
                t.from += r.from;
                t.to += r.from;
                return t;
            });
        })));
    }, []).sort(function (a, b) {
        return a.from - b.from;
    });
}
exports.tokenizer = tokenizer;
function treeBuilder(tokens, tree) {
    if (tree === void 0) { tree = null; }
    var f = ramda_1.head(tokens);
    if (f) {
        var remaining = ramda_1.tail(tokens);
        if (f.type === 'term') {
            return treeBuilder(remaining, { text: f.term });
        }
        else if (f.type === 'filter') {
            return treeBuilder(remaining, { predicate: f.predicate, text: f.term });
        }
        else if (f.type === 'not') {
            var nextTerm = ramda_1.head(remaining);
            return treeBuilder(ramda_1.tail(remaining), {
                value: f.term,
                left: null,
                right: treeBuilder([nextTerm])
            });
        }
        else if (f.type === 'bo') {
            var nextTerm = ramda_1.head(remaining);
            if (nextTerm.type === 'not') {
                var negated = ramda_1.head(ramda_1.tail(remaining));
                return treeBuilder(ramda_1.tail(ramda_1.tail(remaining)), {
                    value: f.term,
                    right: {
                        value: 'NOT',
                        left: null,
                        right: treeBuilder([negated])
                    },
                    left: tree
                });
            }
            else {
                return treeBuilder(ramda_1.tail(remaining), {
                    value: f.term,
                    right: treeBuilder([nextTerm]),
                    left: tree
                });
            }
        }
        else if (f.type === 'group') {
            return treeBuilder(remaining, parseString(f.term));
        }
    }
    else {
        return tree;
    }
}
exports.treeBuilder = treeBuilder;
function parseString(input) {
    var tokens = tokenizer(input);
    return treeBuilder(tokens);
}
exports.parseString = parseString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9xdWVyeS1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUEwQyxPQUFPLENBQUMsQ0FBQTtBQUtsRCxvQ0FBK0IsdUJBQXVCLENBQUMsQ0FBQTtBQUN2RCxtQ0FBOEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNyRCxvQ0FBOEIsdUJBQXVCLENBQUMsQ0FBQTtBQUN0RCx5Q0FBbUMsNEJBQTRCLENBQUMsQ0FBQTtBQUNoRSx5Q0FBbUMsNEJBQTRCLENBQUMsQ0FBQTtBQUNoRSwrQkFBMEIsa0JBQWtCLENBQUMsQ0FBQTtBQUM3Qyw0QkFBdUIsZUFBZSxDQUFDLENBQUE7QUFFdkMsSUFBTSxPQUFPLEdBQUc7SUFDZCw2QkFBa0I7SUFDbEIsNEJBQWlCO0lBQ2pCLHdCQUFhO0lBQ2IscUJBQVU7SUFDVixrQ0FBc0I7SUFDdEIsa0NBQXNCO0lBQ3RCLDZCQUFpQjtDQUNsQixDQUFDO0FBV0YscUJBQXFCLFNBQWdCLEVBQUUsU0FBZ0I7SUFDckQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDMUUsQ0FBQztBQUVELHVCQUF1QixLQUFjLEVBQUUsS0FBYztJQUVuRCxJQUFNLENBQUMsR0FBRyxZQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNOLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7WUFDakcsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBRUQsdUJBQThCLEtBQWEsRUFBRSxNQUFlO0lBRTFELElBQU0sVUFBVSxHQUFVLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDO0lBRXRELElBQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRW5ELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztRQUNqQixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtZQUNaLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUNSLElBQUksRUFBRSxHQUFHO1NBQ1YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFkZSxxQkFBYSxnQkFjNUIsQ0FBQTtBQUVELG1CQUEwQixLQUFhO0lBRXJDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUNuQixVQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1IsSUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsZUFBTyxDQUFDLGNBQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7WUFDeEMsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQVE7Z0JBQzVCLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFDRCxFQUFFLENBQ0gsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztRQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbEJlLGlCQUFTLFlBa0J4QixDQUFBO0FBRUQscUJBQTRCLE1BQWUsRUFBRSxJQUEwRDtJQUExRCxvQkFBMEQsR0FBMUQsV0FBMEQ7SUFDckcsSUFBTSxDQUFDLEdBQVcsWUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFTixJQUFNLFNBQVMsR0FBRyxZQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEVBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQU0sUUFBUSxHQUFHLFlBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDbEMsS0FBSyxFQUFvQixDQUFDLENBQUMsSUFBSTtnQkFDL0IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9CLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQU0sUUFBUSxHQUFHLFlBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLElBQU0sT0FBTyxHQUFHLFlBQUksQ0FBQyxZQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFJLENBQUMsWUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3hDLEtBQUssRUFBb0IsQ0FBQyxDQUFDLElBQUk7b0JBQy9CLEtBQUssRUFBRTt3QkFDTCxLQUFLLEVBQUUsS0FBSzt3QkFDWixJQUFJLEVBQUUsSUFBSTt3QkFDVixLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQzlCO29CQUNELElBQUksRUFBRSxJQUFJO2lCQUNYLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDbEMsS0FBSyxFQUFvQixDQUFDLENBQUMsSUFBSTtvQkFDL0IsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM5QixJQUFJLEVBQUUsSUFBSTtpQkFDWCxDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7SUFDSCxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUM7QUFoRGUsbUJBQVcsY0FnRDFCLENBQUE7QUFFRCxxQkFBNEIsS0FBYTtJQUN2QyxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBSGUsbUJBQVcsY0FHMUIsQ0FBQSJ9