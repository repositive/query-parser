"use strict";
function isBooleanOperator(o) {
    return typeof o === 'string' &&
        ['AND', 'OR', 'NOT'].indexOf(o) !== -1;
}
exports.isBooleanOperator = isBooleanOperator;
function isTerm(o) {
    return typeof o === 'object' &&
        typeof o.text === 'string';
}
exports.isTerm = isTerm;
function isFilter(o) {
    return typeof o === 'object' &&
        typeof o.text === 'string' &&
        typeof o.predicate === 'string';
}
exports.isFilter = isFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYi1leHAtdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluL2ItZXhwLXRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLDJCQUFrQyxDQUFNO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRO1FBQzVCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUhlLHlCQUFpQixvQkFHaEMsQ0FBQTtBQU9ELGdCQUF1QixDQUFNO0lBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRO1FBQzFCLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7QUFDL0IsQ0FBQztBQUhlLGNBQU0sU0FHckIsQ0FBQTtBQVFELGtCQUF5QixDQUFNO0lBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRO1FBQzFCLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzFCLE9BQU8sQ0FBQyxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUM7QUFDcEMsQ0FBQztBQUplLGdCQUFRLFdBSXZCLENBQUEifQ==