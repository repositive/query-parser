export function toElasticQuery(query) {

  const ops = {
    $and: 'must', // AND
    $or: 'should', // OR
    $not: 'must_not' // NOT
  };

  function build(query): any {
    const key = Object.keys(query)[0];
    // Leaf node
    if (!key.startsWith('$')) {
      const field = key === 'text' ? '_all' : key;
      return { match: { [field]: query[key] } };
    }

    // Node with children
    let children = [];
    for (let child of query[key]) {
      children.push(build(child));
    }
    return {
      bool: {
        [ops[key]]: children
      }
    };
  }

  return { query: build(query) };
}