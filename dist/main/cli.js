"use strict";
var b_tree_1 = require('./b-tree');
//const parsed = parser('cancer NOT (brain OR lung)');
var left = new b_tree_1.default('left');
var tree = new b_tree_1.default('plus', left);
var parent = new b_tree_1.default('NOT', null, tree);
console.log(parent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSx1QkFBa0IsVUFBVSxDQUFDLENBQUE7QUFFN0Isc0RBQXNEO0FBRXRELElBQU0sSUFBSSxHQUFHLElBQUksZ0JBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixJQUFNLElBQUksR0FBRyxJQUFJLGdCQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JDLElBQU0sTUFBTSxHQUFHLElBQUksZ0JBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMifQ==