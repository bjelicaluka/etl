import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Pagination = ({ onPageChange, totalPages = Infinity }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [anchoredPage, setAnchoredPage] = useState(2);

  const handlePageChangeClick = (newPage) => (e) => {
    e.preventDefault();
    if (newPage > 0) {
      setCurrentPage(newPage);
      if (newPage === anchoredPage + 2) {
        setAnchoredPage(anchoredPage + 1);
      } else if (newPage === anchoredPage - 2) {
        setAnchoredPage(anchoredPage - 1);
      }
      onPageChange(newPage);
    }
  }

  return (
    <div className="card-footer py-4 bg-dark">
      <nav aria-label="...">
        <ul className="pagination justify-content-end mb-0">
          {
            currentPage !== 1 &&
            <li className="page-item">
              <Link
                to="/"
                className="page-link bg-dark tex-white border-gray"
                onClick={handlePageChangeClick(currentPage - 1)}
              >
                <i className="fas fa-angle-left"></i>
              </Link>
            </li>
          }
          {[anchoredPage - 1, anchoredPage, anchoredPage + 1].map((page, i) =>
            page <= totalPages &&
            <li key={i} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <Link
                to="/"
                className={`page-link ${page === currentPage ? 'border-darker bg-darker' : 'border-gray bg-dark'}`}
                onClick={handlePageChangeClick(page)}
              >
                {page}
              </Link>
            </li>
          )}
          {
            currentPage < totalPages &&
            <li className="page-item">
              <Link
                to="/"
                className="page-link bg-dark tex-white border-gray"
                onClick={handlePageChangeClick(currentPage + 1)}
              >
                <i className="fas fa-angle-right"></i>
              </Link>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
};