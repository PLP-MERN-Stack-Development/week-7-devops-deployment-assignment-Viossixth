function isValidStatus(status) {
  const validStatuses = ['open', 'in-progress', 'resolved'];
  return validStatuses.includes(status);
}

module.exports = isValidStatus;
