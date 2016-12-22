"use strict";
var ramda_1 = require('ramda');
var uuid_1 = require('uuid');
var extract_parenthesys_1 = require('./extract-parenthesys');
var extract_predicates_1 = require('./extract-predicates');
var extract_loose_words_1 = require('./extract-loose-words');
var extract_explicit_boolean_1 = require('./extract-explicit-boolean');
var extract_implicit_boolean_1 = require('./extract-implicit-boolean');
var extract_quoted_1 = require('./extract-quoted');
var extract_NOT_1 = require('./extract-NOT');
var parser_1 = require('../parser');
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
            return treeBuilder(remaining, {
                _id: uuid_1.v4(),
                text: f.term
            });
        }
        else if (f.type === 'filter') {
            return treeBuilder(remaining, { _id: uuid_1.v4(), predicate: f.predicate, text: f.term }); //TODO: Add id
        }
        else if (f.type === 'not') {
            var nextTerm = ramda_1.head(remaining);
            return treeBuilder(ramda_1.tail(remaining), {
                //TODO: Add id
                _id: uuid_1.v4(),
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
                    //TODO: Add id
                    _id: uuid_1.v4(),
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
                    _id: uuid_1.v4(),
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
    return parser_1.parse(input);
}
exports.parseString = parseString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9xdWVyeS1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUEwQyxPQUFPLENBQUMsQ0FBQTtBQUlsRCxxQkFBeUIsTUFBTSxDQUFDLENBQUE7QUFFaEMsb0NBQStCLHVCQUF1QixDQUFDLENBQUE7QUFDdkQsbUNBQThCLHNCQUFzQixDQUFDLENBQUE7QUFDckQsb0NBQThCLHVCQUF1QixDQUFDLENBQUE7QUFDdEQseUNBQW1DLDRCQUE0QixDQUFDLENBQUE7QUFDaEUseUNBQW1DLDRCQUE0QixDQUFDLENBQUE7QUFDaEUsK0JBQTBCLGtCQUFrQixDQUFDLENBQUE7QUFDN0MsNEJBQXVCLGVBQWUsQ0FBQyxDQUFBO0FBRXZDLHVCQUFvQixXQUFXLENBQUMsQ0FBQTtBQUVoQyxJQUFNLE9BQU8sR0FBRztJQUNkLDZCQUFrQjtJQUNsQiw0QkFBaUI7SUFDakIsd0JBQWE7SUFDYixxQkFBVTtJQUNWLGtDQUFzQjtJQUN0QixrQ0FBc0I7SUFDdEIsNkJBQWlCO0NBQ2xCLENBQUM7QUFXRixxQkFBcUIsU0FBZ0IsRUFBRSxTQUFnQjtJQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztBQUMxRSxDQUFDO0FBRUQsdUJBQXVCLEtBQWMsRUFBRSxLQUFjO0lBRW5ELElBQU0sQ0FBQyxHQUFHLFlBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ04sSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxD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