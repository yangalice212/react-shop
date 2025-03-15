interface Pagination {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
  category: string;
}

interface PaginationProps {
  pagination: Pagination;
  changePage: (page: number) => void;
}

function Pagination({ pagination, changePage }: PaginationProps) {
  const switchPage = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    changePage(page);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            className={`page-link ${pagination.has_pre ? '' : 'disabled'}`}
            href="/"
            aria-label="Previous"
            onClick={(e) => switchPage(e, pagination.current_page - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {[...new Array(pagination.total_pages)].map((_, i) => (
          <li className="page-item" key={`${i}_page`}>
            <a
              className={`page-link ${
                i + 1 === pagination.current_page && 'active'
              }`}
              href="/"
              onClick={(e) => switchPage(e, i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className={`page-link ${pagination.has_next ? '' : 'disabled'}`}
            href="/"
            aria-label="Next"
            onClick={(e) => switchPage(e, pagination.current_page + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
