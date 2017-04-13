"use strict";
var ramda_1 = require('ramda');
var b_exp_tree_1 = require("../b-exp-tree");
var index_1 = require("../b-tree/index");
var uuid_1 = require('uuid');
function getPath(tree, id, acc) {
    if (acc === void 0) { acc = []; }
    if (tree._id === id) {
        return ramda_1.append(tree._id, acc);
    }
    else if (index_1.isBTree(tree)) {
        var newAcc = ramda_1.append(tree._id, acc);
        return (tree.left ? getPath(tree.left, id, newAcc) : null) || (tree.right ? getPath(tree.right, id, newAcc) : null);
    }
    else {
        return null;
    }
}
exports.getPath = getPath;
function removeNodeByID(tree, id) {
    return index_1.map(tree, function (t, l, r) {
        if (index_1.isBTree(t) && t.value === 'NOT' && !l && !r)
            return null;
        if (index_1.isBTree(t) && t.value !== 'NOT' && !l)
            return r;
        if (index_1.isBTree(t) && t.value !== 'NOT' && !r)
            return l;
        if (t && t._id === id)
            return null;
        if (index_1.isBTree(t))
            return new index_1.default(t.value, l, r);
        return t;
    });
}
exports.removeNodeByID = removeNodeByID;
function getFilters(tree) {
    return index_1.filter(tree, b_exp_tree_1.isFilter);
}
exports.getFilters = getFilters;
function removeFilter(tree, predicate, text) {
    return index_1.map(tree, function (t, l, r) {
        if (b_exp_tree_1.isFilter(t) && t.text === text && t.predicate === predicate)
            return null;
        if (index_1.isBTree(t) && t.value !== null && !l && !r)
            return null;
        if (index_1.isBTree(t) && t.value !== 'NOT' && (!l || !r))
            return l || r;
        if (index_1.isBTree(t))
            return { value: t.value, right: r, left: l };
        return t;
    });
}
exports.removeFilter = removeFilter;
function addFilter(tree, predicate, text) {
    var filtered = index_1.filter(tree, (function (t) {
        return b_exp_tree_1.isFilter(t) && t.predicate === predicate;
    }));
    var exists = filtered.filter(function (f) { return f.text === text; });
    if (exists.length > 0) {
        return tree; // Or throw exception
    }
    else {
        if (!tree)
            return { _id: uuid_1.v4(), text: text, predicate: predicate };
        else
            return new index_1.default('AND', { _id: uuid_1.v4(), text: text, predicate: predicate }, tree);
    }
    // } else if (filtered.length === 0) {
    //   if (!tree)
    //     return <Filter> { _id: uuid(), text: text, predicate: predicate };
    //   else
    //     return new BTreeImp(<BooleanOperator>'AND', <Filter> { _id: uuid(), text: text, predicate: predicate }, tree);
    // } else {
    //   const pred = filtered[0];
    //   return <BBTree> map(tree, (t, l, r) => {
    //     if (isFilter(t) && t._id === pred._id) {
    //       return <BBTree> new BTreeImp(<BooleanOperator>'OR', <Filter> { _id: uuid(), text: text, predicate: predicate }, t);
    //     }
    //     else if (isBTree(t)) {
    //       return new BTreeImp(t.value, l, r);
    //     } else if (isTerm(t)) {
    //       return t;
    //     }
    //   });
    // }
}
exports.addFilter = addFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL29wZXJhdGlvbnMvZmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQXFCLE9BQU8sQ0FBQyxDQUFBO0FBRTdCLDJCQUEyRSxlQUFlLENBQUMsQ0FBQTtBQUMzRixzQkFBd0QsaUJBQWlCLENBQUMsQ0FBQTtBQUMxRSxxQkFBMEIsTUFBTSxDQUFDLENBQUE7QUFFakMsaUJBQXdCLElBQXdCLEVBQUUsRUFBVSxFQUFFLEdBQWtCO0lBQWxCLG1CQUFrQixHQUFsQixRQUFrQjtJQUM5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLGNBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFNLE1BQU0sR0FBRyxjQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO0lBQ3JILENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQztBQVhlLGVBQU8sVUFXdEIsQ0FBQTtBQUVELHdCQUErQixJQUF3QixFQUFFLEVBQVU7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