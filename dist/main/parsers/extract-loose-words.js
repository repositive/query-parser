"use strict";
const ramda_1 = require('ramda');
function extractLooseWords(input, acc = []) {
    return ramda_1.concat(acc, input.split(' ').filter(k => k).map(w => {
        const from = input.indexOf(w);
        return {
            type: 'term',
            from: from,
            to: from + w.length,
            term: w
        };
    }));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractLooseWords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC1sb29zZS13b3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL3BhcnNlcnMvZXh0cmFjdC1sb29zZS13b3Jkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0JBQXFCLE9BQU8sQ0FBQyxDQUFBO0FBRzdCLDJCQUEwQyxLQUFhLEVBQUUsR0FBRyxHQUFZLEVBQUU7SUFDeEUsTUFBTSxDQUFDLGNBQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFTO1lBQ2IsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU07WUFDbkIsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFWRDttQ0FVQyxDQUFBIn0=