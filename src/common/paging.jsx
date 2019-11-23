import React from "react";
const Pagination = ({
  onPageChange,
  currentPage,
  onPageNext,
  onPagePrevious
}) => {
  console.log("Current", currentPage);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          key="Previous"
          className={1 === currentPage ? "page-item disabled" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPagePrevious()}>
            Previous
          </a>
        </li>
        <li
          key={1}
          className={1 === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(1)}>
            1
          </a>
        </li>
        <li
          key={2}
          className={2 === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(2)}>
            2
          </a>
        </li>
        <li
          key={3}
          className={3 === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(3)}>
            3
          </a>
        </li>

        <li
          key={4}
          className={4 === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(4)}>
            4
          </a>
        </li>
        <li
          key={5}
          className={5 === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(5)}>
            5
          </a>
        </li>
        <li
          key={6}
          className={6 === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(6)}>
            6
          </a>
        </li>

        <li
          key={7}
          className={7 === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(7)}>
            7
          </a>
        </li>
        <li
          key={8}
          className={8 === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(8)}>
            8
          </a>
        </li>
        <li
          key={9}
          className={9 === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(9)}>
            9
          </a>
        </li>
        <li
          key="Next"
          className={9 === currentPage ? "page-item disabled" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => onPageNext()}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
