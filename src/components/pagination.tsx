import Button from '@/components/button';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { useIsFetching } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';

export interface PaginationProps {
  hasNext: boolean;
  hasPrev: boolean;
}

const Pagination = ({ hasNext, hasPrev }: PaginationProps): ReactNode => {
  const isFetching = useIsFetching({ queryKey: ['images'] });

  return (
    <div className="my-8 flex justify-center gap-2">
      <Link
        tabIndex={-1}
        to={'/images'}
        disabled={!hasPrev || Boolean(isFetching)}
        search={({ page = 1, limit = DEFAULT_PAGE_SIZE }) => ({
          page: page - 1,
          limit,
        })}
      >
        <Button disabled={!hasPrev || Boolean(isFetching)}>Prev</Button>
      </Link>
      <Link
        to={'/images'}
        tabIndex={-1}
        disabled={!hasNext}
        search={({ page = 1, limit = DEFAULT_PAGE_SIZE }) => ({
          page: page + 1,
          limit,
        })}
      >
        <Button disabled={!hasNext || Boolean(isFetching)}>Next</Button>
      </Link>
    </div>
  );
};

export default Pagination;
