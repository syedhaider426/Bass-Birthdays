/* Function is used to paginate the total content into equally spaced pages
 *
 * Params:
 * 1) artists - List of artists array
 * 2) activePage - Indicates the active page
 * 3) amountPerPage - Indicates the total amount of records that can be allowed on a page
 */

function paginate(artists, activePage, amountPerPage) {
  //to get records 1-25, active page needs to be 1, page count is 25
  //to get records 26-50, active page needs to be 2, page count is 25

  //slicing - start index, ending index - 1
  var startingIndex = (activePage - 1) * amountPerPage; //if pagenumber is 1, then this sets starting index to 0
  var endingIndex = startingIndex + amountPerPage; //if index is 0 + page amount, you get indexes 0-24, which is essentially 25 records
  return artists.slice(startingIndex, endingIndex);
}

export default paginate;
