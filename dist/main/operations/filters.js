"use strict";
var ramda_1 = require('ramda');
var b_exp_tree_1 = require('../b-exp-tree');
var index_1 = require('../b-tree/index');
var uuid_1 = require('uuid');
function getPath(tree, id, acc) {
    if (acc === void 0) { acc = []; }
    if (tree._id === id) {
        return ramda_1.append(tree._id, acc);
    }
    else if (index_1.isBTree(tree)) {
        var newAcc = ramda_1.append(tree._id, acc);
        return (tree.left ? getPath(tree.left, id, newAcc) : undefined) || (tree.right ? getPath(tree.right, id, newAcc) : undefined);
    }
    else {
        return undefined;
    }
}
exports.getPath = getPath;
function removeNodeByID(tree, id) {
    return index_1.map(tree, function (t, l, r) {
        if (index_1.isBTree(t) && t.value === 'NOT' && !l && !r)
            return undefined;
        if (index_1.isBTree(t) && t.value !== 'NOT' && !l)
            return r;
        if (index_1.isBTree(t) && t.value !== 'NOT' && !r)
            return l;
        if (t && t._id === id)
            return undefined;
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
            return undefined;
        if (index_1.isBTree(t) && t.value !== undefined && !l && !r)
            return undefined;
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
}
exports.addFilter = addFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL29wZXJhdGlvbnMvZmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQXFCLE9BQU8sQ0FBQyxDQUFBO0FBRTdCLDJCQUFtRSxlQUFlLENBQUMsQ0FBQTtBQUNuRixzQkFBd0QsaUJBQWlCLENBQUMsQ0FBQTtBQUMxRSxxQkFBMEIsTUFBTSxDQUFDLENBQUE7QUFFakMsaUJBQXdCLElBQXdCLEVBQUUsRUFBVSxFQUFFLEdBQWtCO0lBQWxCLG1CQUFrQixHQUFsQixRQUFrQjtJQUM5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLGNBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFNLE1BQU0sR0FBRyxjQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ2hJLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztBQUNILENBQUM7QUFUZSxlQUFPLFVBU3RCLENBQUE7QUFFRCx3QkFBK0IsSUFBd0IsRUFBRSxFQUFV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