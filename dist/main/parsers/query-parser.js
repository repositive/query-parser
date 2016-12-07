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
    var tokens = tokenizer(input);
    return treeBuilder(tokens);
}
exports.parseString = parseString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9xdWVyeS1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUEwQyxPQUFPLENBQUMsQ0FBQTtBQUlsRCxxQkFBeUIsTUFBTSxDQUFDLENBQUE7QUFFaEMsb0NBQStCLHVCQUF1QixDQUFDLENBQUE7QUFDdkQsbUNBQThCLHNCQUFzQixDQUFDLENBQUE7QUFDckQsb0NBQThCLHVCQUF1QixDQUFDLENBQUE7QUFDdEQseUNBQW1DLDRCQUE0QixDQUFDLENBQUE7QUFDaEUseUNBQW1DLDRCQUE0QixDQUFDLENBQUE7QUFDaEUsK0JBQTBCLGtCQUFrQixDQUFDLENBQUE7QUFDN0MsNEJBQXVCLGVBQWUsQ0FBQyxDQUFBO0FBRXZDLElBQU0sT0FBTyxHQUFHO0lBQ2QsNkJBQWtCO0lBQ2xCLDRCQUFpQjtJQUNqQix3QkFBYTtJQUNiLHFCQUFVO0lBQ1Ysa0NBQXNCO0lBQ3RCLGtDQUFzQjtJQUN0Qiw2QkFBaUI7Q0FDbEIsQ0FBQztBQVdGLHFCQUFxQixTQUFnQixFQUFFLFNBQWdCO0lBQ3JELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO0FBQzFFLENBQUM7QUFFRCx1QkFBdUIsS0FBYyxFQUFFLEtBQWM7SUFFbkQsSUFBTSxDQUFDLEdBQUcsWUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTixJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztZQUMxQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLENB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