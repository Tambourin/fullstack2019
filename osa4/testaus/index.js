const average = (array) => {
  const reducer = (sum, currentItem) =>  {
    return sum + currentItem;
  }

  return array.length === 0 
  ? 0
  : array.reduce(reducer, 0) / array.length;
}

module.exports = {
  average
}