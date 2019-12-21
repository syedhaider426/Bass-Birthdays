import React from "react";
import _ from "lodash";

const Pagination = ({
  onPageChange,
  currentPage,
  onPageNext,
  onPagePrevious,
  itemsCount,
  pageSize
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1); //if pagesCount is 3, then it will be 1,2; thats why we add 1

  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];
  if (pages.length === 1)
    return (
      <nav className="paging">
        <ul className="pagination">
          <li key={"1"} className="page-item active page-num">
            <a style={{ cursor: "pointer" }} className="page-link">
              1
            </a>
          </li>
        </ul>
      </nav>
    );
  return (
    <nav className="paging">
      <ul className="pagination">
        <li
          key={"Previous"}
          className={
            firstPage === currentPage ? "page-item disabled" : "page-item"
          }
        >
          <a
            style={{ cursor: "pointer" }}
            className="page-link"
            onClick={() => onPagePrevious()}
            href="#all-birthdays"
          >
            Previous
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={
              page === currentPage
                ? "page-item active page-num"
                : "page-item page-num"
            }
          >
            <a
              style={{ cursor: "pointer" }}
              className="page-link "
              onClick={() => onPageChange(page)}
              href="#all-birthdays"
            >
              {page}
            </a>
          </li>
        ))}
        <li
          key={"Next"}
          className={
            lastPage === currentPage ? "page-item disabled" : "page-item"
          }
        >
          <a
            style={{ cursor: "pointer" }}
            className="page-next page-link"
            onClick={() => onPageNext()}
            href="#all-birthdays"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
