"use strict";
const b_tree_1 = require('./b-tree');
//const parsed = parser('cancer NOT (brain OR lung)');
const left = new b_tree_1.default('left');
const tree = new b_tree_1.default('plus', left);
const parent = new b_tree_1.default('NOT', null, tree);
console.log(parent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSx5QkFBa0IsVUFBVSxDQUFDLENBQUE7QUFFN0Isc0RBQXNEO0FBRXRELE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMifQ==