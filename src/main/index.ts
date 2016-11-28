export function toBoolString(query): string {
  /*
   Stringify query object into Boolean Algebra string:
   1. Recursively iterate over query object (tree structure) (TODO: Validate object. -> Detect circular structures?)
   2. Keys starting with $ are root nodes.
   3. Concatenate leafs using the root's operator.
   */

  const key = Object.keys(query)[0]; // Only has one key
  if (query.hasOwnProperty(key)) {
    /*
     Case 1: Child is node with children
     */
    if (key.startsWith('$')) {
      const operator = key.slice(1).toUpperCase();
      const children = query[key];
      let result = [];
      for (let i = 0; i < children.length; i++) {
        result.push(toBoolString(children[i]));
      }
      const temp = result.join(` ${operator} `);
      if (operator === 'NOT') return `${operator} ${temp}`;
      return "(" + temp + ")";
    }
    /*
     Case 2: Child is leaf node
     */
    // Deal with white space and add predicate for non-text searches.
    const value = /\s+/.test(query[key]) ? `"${query[key]}"` : query[key];
    if (key === 'text') {
      return value;
    }
    return `${key}:${value}`;
  }
}
