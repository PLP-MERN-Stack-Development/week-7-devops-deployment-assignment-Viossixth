function isValidBug(bug) {
  return bug && typeof bug.title === 'string' && bug.title.trim() !== '';
}

module.exports = isValidBug;
