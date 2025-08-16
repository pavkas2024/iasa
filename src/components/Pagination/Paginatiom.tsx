'use client'

import React from 'react';
import styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`${styles.pageButton} ${i === currentPage ? styles.active : ''}`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>
      {renderPages()}
      <button
        className={styles.pageButton}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;