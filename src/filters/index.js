const toReadableDate = (timeStampParsed) => {
  let dateObj = new Date(timeStampParsed);
  const toTwoDigits = (str) => {
    if (str.valueOf() < 10) {
      return '0' + str;
    }
    return str;
  }
  return `${toTwoDigits(dateObj.getMonth() + 1)}-${toTwoDigits(dateObj.getDay())}, ${toTwoDigits(dateObj.getHours())}:${toTwoDigits(dateObj.getMinutes())}`;
};

let filters = {
  toReadableDate,
};

export default filters;
