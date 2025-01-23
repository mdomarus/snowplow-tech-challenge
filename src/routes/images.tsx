import { imagesQueryOptions } from '@/api/imagesQueryOptions';
import LoadingError from '@/components/layout/loading-error';
import { DEFAULT_PAGE_SIZE } from '@/main';
import ImagesPage from '@/pages/images-page';
import { createFileRoute } from '@tanstack/react-router';

interface ImagesPageSearchParams {
  page: number;
  limit: number;
}

export const Route = createFileRoute('/images')({
  validateSearch: (search: Record<string, unknown>): ImagesPageSearchParams => {
    // validate and parse the search params into a typed state
    const page = Number(search.page);
    const limit = Number(search.limit);

    return {
      page: isNaN(page) ? 1 : page,
      limit: isNaN(limit) ? DEFAULT_PAGE_SIZE : limit,
    };
  },
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: ({ context: { queryClient }, deps: { page, limit } }) =>
    queryClient.ensureQueryData(imagesQueryOptions(page, limit)),
  component: ImagesPage,
  errorComponent: LoadingError,
});
