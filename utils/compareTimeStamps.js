const { parseISO, compareDesc, isValid } = require("date-fns");

function isSortedDescending(timestamps) {
  if (!Array.isArray(timestamps)) {
    throw new Error('Input must be an array of timestamps');
  }

  for (let i = 0; i < timestamps.length - 1; i++) {
    const current = parseISO(timestamps[i]);
    const next = parseISO(timestamps[i + 1]);

    // Check if either date is invalid
    if (!isValid(current) || !isValid(next)) {
      throw new Error('Invalid date format detected');
    }

    if (compareDesc(current, next) > 0) {
      return false;
    }
  }
  return true;
}

module.exports = { isSortedDescending };
