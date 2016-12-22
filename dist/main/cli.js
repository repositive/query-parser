"use strict";
var parser_1 = require('./parser');
var filters_1 = require('./operations/filters');
var str = "assay:RNA-Seq cancer breast";
console.log(JSON.stringify(filters_1.removeFilter(parser_1.parse(str), 'assay', 'RNA-Seq'), null, 2));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBb0IsVUFBVSxDQUFDLENBQUE7QUFDL0Isd0JBQTJCLHNCQUFzQixDQUFDLENBQUE7QUFFbEQsSUFBTSxHQUFHLEdBQUcsNkJBQTZCLENBQUE7QUFFekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUN4QixzQkFBWSxDQUNWLGNBQUssQ0FBQyxHQUFHLENBQUMsRUFDVixPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQ25CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDIn0=