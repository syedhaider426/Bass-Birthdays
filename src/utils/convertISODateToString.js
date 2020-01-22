// Converts ISO date returned from MongoDB into
// a readable string
function convertISODateToString(date) {
  var dateString = date.substring(0, 10);
  var month = dateString.substring(5, 7);
  date = dateString.substring(8);
  dateString = month + "/" + date;
  return dateString;
}

export default convertISODateToString;
