import React from "react";
import _ from "lodash";

/* Pagination component can be used to split results into pages */
const Pagination = ({
  onPageChange,
  currentPage,
  onPageNext,
  onPagePrevious,
  itemsCount,
  pageSize
}) => {
  //The ceiling function is used in situations where a decimal is returned by the division of itemsCount and pageSize
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1); //if pagesCount is 3, then it will be 1,2; thats why we add 1
  const length = pages.length;
  //Used to determine when to disable the 'Next' button
  const firstPage = pages[0];
  //Used to determine when to disable the 'Previous' button
  const lastPage = pages[length - 1];

  if (length < 2) return <div></div>;

  /* pagination count5/count4 used to determine if the paging should wrap to the next line if there is no width/space on the device's screen */
  return (
    <nav className="paging">
      <ul className={length >= 5 ? "pagination count5" : "pagination count4"}>
        <li
          key={"Previous"}
          className={
            firstPage === currentPage ? "page-item disabled" : "page-item"
          }
        >
          <a
            style={{ cursor: "pointer" }}
            className="page-previous page-link"
            onClick={() => onPagePrevious()}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={
              page === currentPage ? "page-item active ml-1" : "page-item ml-1"
            }
          >
            <a
              style={{ cursor: "pointer" }}
              className="page-link "
              onClick={() => onPageChange(page)}
              tabIndex="1"
            >
              {page}
            </a>
          </li>
        ))}
        <li
          key={"Next"}
          className={
            lastPage === currentPage
              ? "page-item disabled ml-1"
              : "page-item ml-1"
          }
        >
          <a
            style={{ cursor: "pointer" }}
            className="page-link"
            onClick={() => onPageNext()}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
