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
  console.log(pages);
  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];
  return (
    <nav className="paging">
      <ul className="pagination">
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
      </ul>
    </nav>
  );
};

export default Pagination;
