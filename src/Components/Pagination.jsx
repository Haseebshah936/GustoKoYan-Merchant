import React, { useEffect, useState } from "react";
import _, { set } from "lodash";
import styled from "styled-components";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

function Pagination({ pagesCount, onPageChange, currentPage }) {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    setPages(_.range(1, 2));
  }, []);

  const onPagination = (n) => {
    const curr = currentPage + n;
    if (curr <= pagesCount && curr > 0) {
      if (curr <= pagesCount) {
        setPages(_.range(curr, curr + 1));
        onPageChange(curr);
      }
    }
  };
  return (
    <Conatiner>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <a onClick={() => onPagination(-1)} className="page-link">
                Previous
              </a>
            </li>
          )}
          {!(pagesCount <= 1) &&
            pages.map((page) => (
              <li className="page-item" key={page}>
                <a
                  onClick={() => onPageChange(page)}
                  className={
                    page === currentPage ? "page-link active" : "page-link"
                  }
                >
                  {page}
                </a>
              </li>
            ))}

          {currentPage < pagesCount && (
            <li className="page-item" aria-disabled="true09">
              <a onClick={() => onPagination(1)} className="page-link">
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </Conatiner>
  );
}

export default Pagination;

const Conatiner = styled.div`
  font-size: 1.5rem;
  a {
    padding: 1rem 1.5rem;
    cursor: pointer;
    color: #287dcc;
  }
  a.active {
    background: #287dcc;
    color: white;
  }
`;
