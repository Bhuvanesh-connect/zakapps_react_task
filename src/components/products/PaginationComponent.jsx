import { Pagination } from 'react-bootstrap';
import styles from './../products/products.module.scss';

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}) => {

  if (totalPages <= 1) return null;

  const half = Math.floor(maxVisible / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  return (
    <Pagination className={styles.paginationRow}>
      <Pagination.First
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      />

      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {start > 1 && <Pagination.Ellipsis disabled />}

      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      {end < totalPages && <Pagination.Ellipsis disabled />}

      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />

      <Pagination.Last
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      />
    </Pagination>
  );
};

export default PaginationComponent;
