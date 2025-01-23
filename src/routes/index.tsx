import { DEFAULT_PAGE_SIZE } from '@/constants';
import { Navigate, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <Navigate to="/images" search={{ page: 1, limit: DEFAULT_PAGE_SIZE }} />
  ),
});
