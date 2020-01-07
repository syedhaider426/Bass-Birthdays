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
  const length = pages.length;
  if (pages.length < 2) return <div></div>;

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
            >
              {page}
            </a>
          </li>
        ))}
        <li
          key={"Next"}
          className={
            lastPage === currentPage
              ? "page-item disabled page-next"
              : "page-item page-next"
          }
        >
          <a
            style={{ cursor: "pointer" }}
            className="page-link"
            onClick={() => onPageNext()}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
