import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type OnPageChange = (page:number) => void;

interface PaginationProps {
  currentPage: number
  onPageChange: OnPageChange
}

export const Pagination: React.FC<PaginationProps> = ( {currentPage, onPageChange } ) => {

	return (
		<ReactPaginate
				className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onPageChange(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
	)
}