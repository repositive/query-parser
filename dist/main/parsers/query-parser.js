"use strict";
const ramda_1 = require('ramda');
const extract_parenthesys_1 = require('./extract-parenthesys');
const extract_predicates_1 = require('./extract-predicates');
const extract_loose_words_1 = require('./extract-loose-words');
const extract_explicit_boolean_1 = require('./extract-explicit-boolean');
const extract_implicit_boolean_1 = require('./extract-implicit-boolean');
const extract_quoted_1 = require('./extract-quoted');
const extract_NOT_1 = require('./extract-NOT');
const parsers = [
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
    const s = ramda_1.head(split);
    if (s) {
        const newInput = input.map(r => {
            if (isContained(r, s)) {
                return [{ from: r.from, to: s.from }, { from: s.to, to: r.to }].filter(rng => rng.from !== rng.to);
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
    const inputRange = { from: 0, to: input.length };
    const ranges = rangeSplitter([inputRange], tokens);
    return ranges.map(r => {
        const str = input.substring(r.from, r.to);
        return {
            from: r.from,
            to: r.to,
            term: str
        };
    }).filter(t => t.term !== '');
}
exports.tokenStripper = tokenStripper;
function tokenizer(input) {
    return parsers.reduce((tokens, p) => {
        const ranges = tokenStripper(input, tokens);
        return ramda_1.flatten(ramda_1.concat(tokens, ranges.map(r => {
            const newTokens = p(r.term);
            return newTokens.map((t) => {
                t.from += r.from;
                t.to += r.from;
                return t;
            });
        })));
    }, []).sort((a, b) => {
        return a.from - b.from;
    });
}
exports.tokenizer = tokenizer;
function treeBuilder(tokens, tree = null) {
    const f = ramda_1.head(tokens);
    if (f) {
        const remaining = ramda_1.tail(tokens);
        if (f.type === 'term') {
            return treeBuilder(remaining, { text: f.term });
        }
        else if (f.type === 'filter') {
            return treeBuilder(remaining, { predicate: f.predicate, text: f.term });
        }
        else if (f.type === 'not') {
            const nextTerm = ramda_1.head(remaining);
            return treeBuilder(ramda_1.tail(remaining), {
                value: f.term,
                left: null,
                right: treeBuilder([nextTerm])
            });
        }
        else if (f.type === 'bo') {
            const nextTerm = ramda_1.head(remaining);
            if (nextTerm.type === 'not') {
                const negated = ramda_1.head(ramda_1.tail(remaining));
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
    const tokens = tokenizer(input);
    return treeBuilder(tokens);
}
exports.parseString = parseString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9xdWVyeS1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUEwQyxPQUFPLENBQUMsQ0FBQTtBQUtsRCxzQ0FBK0IsdUJBQXVCLENBQUMsQ0FBQTtBQUN2RCxxQ0FBOEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNyRCxzQ0FBOEIsdUJBQXVCLENBQUMsQ0FBQTtBQUN0RCwyQ0FBbUMsNEJBQTRCLENBQUMsQ0FBQTtBQUNoRSwyQ0FBbUMsNEJBQTRCLENBQUMsQ0FBQTtBQUNoRSxpQ0FBMEIsa0JBQWtCLENBQUMsQ0FBQTtBQUM3Qyw4QkFBdUIsZUFBZSxDQUFDLENBQUE7QUFFdkMsTUFBTSxPQUFPLEdBQUc7SUFDZCw2QkFBa0I7SUFDbEIsNEJBQWlCO0lBQ2pCLHdCQUFhO0lBQ2IscUJBQVU7SUFDVixrQ0FBc0I7SUFDdEIsa0NBQXNCO0lBQ3RCLDZCQUFpQjtDQUNsQixDQUFDO0FBV0YscUJBQXFCLFNBQWdCLEVBQUUsU0FBZ0I7SUFDckQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDMUUsQ0FBQztBQUVELHVCQUF1QixLQUFjLEVBQUUsS0FBYztJQUVuRCxNQUFNLENBQUMsR0FBRyxZQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNOLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUks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