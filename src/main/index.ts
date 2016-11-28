export function toBoolString(query): string {
  /*
   Stringify query object into Boolean Algebra string:
   1. Recursively iterate over query object (tree structure) (TODO: Validate object. -> Detect circular structures?)
   2. Keys starting with $ are root nodes.
   3. Concatenate leafs using the root's operator.
   */

  // Query object only has one key
  const key = Object.keys(query)[0]; // Unvalidated objects might break this.
  if (!key.startsWith('$')) {
    /*
     Case 1: Child is leaf node
     */
    // Deal with white space and add predicate for non-text searches.
    const value = /\s+/.test(query[key]) ? `"${query[key]}"` : query[key];
    if (key === 'text') {
      return value;
    }
    return `${key}:${value}`;
  }

  /*
   Case 2: Child is node with children
   */
  const operator = key.slice(1).toUpperCase();
  let result = [];
  for (let child of query[key]) {
    result.push(toBoolString(child));
  }
  if (operator === 'NOT') return `${operator} ${result}`;
  return "(" + result.join(` ${operator} `) + ")";
}
