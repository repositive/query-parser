export function toElasticQuery(query): any {
  const ESQuery = {
    query: {
      bool: {}
    }
  };


  function build(query) {
    // Add every term not under NOT to 'must' term
    const key = Object.keys(query)[0];
    if (!key.startsWith('$')) {
      // Leaf node
      // const value =

    }

    // Every NOT term to must_not

  }
}