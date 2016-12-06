"use strict";
const ramda_1 = require('ramda');
/**
 * Created by dennis on 01/12/2016.
 */
function extractPredicates(input, acc = []) {
    const matches = input.match(/\s*(\S+)\s?:\s?((\".*\")|(\S+))\s*/g);
    if (!matches)
        return acc;
    const extract = m => {
        const str = m.trim();
        const temp = str.split(':');
        return {
            type: 'filter',
            from: input.indexOf(str),
            to: input.indexOf(str) + str.length,
            term: temp[1].trim().replace(/\"/g, ''),
            predicate: temp[0].trim()
        };
    };
    return ramda_1.concat(acc, matches.map(extract));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractPredicates;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1wcmVkaWNhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vcGFyc2Vycy9leHRyYWN0LXByZWRpY2F0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHdCQUFxQixPQUFPLENBQUMsQ0FBQTtBQUM3Qjs7R0FFRztBQUVILDJCQUEwQyxLQUFhLEVBQUUsR0FBRyxHQUFZLEVBQUU7SUFFeEUsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ25FLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUV6QixNQUFNLE9BQU8sR0FBRyxDQUFDO1FBQ2YsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFTO1lBQ2IsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDeEIsRUFBRSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU07WUFDbkMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN2QyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtTQUMxQixDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsTUFBTSxDQUFDLGNBQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFsQkQ7bUNBa0JDLENBQUEifQ==