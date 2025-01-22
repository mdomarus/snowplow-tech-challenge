import { imagesQueryOptions } from '@/api/imagesQueryOptions';
import LoadingError from '@/components/loading-error';
import ImagesPage from '@/pages/images-page';
import { createFileRoute } from '@tanstack/react-router';

interface ImagesPageSearchParams {
  page: number;
  limit: number;
}

export const Route = createFileRoute('/images')({
  validateSearch: (search: Record<string, unknown>): ImagesPageSearchParams => {
    // validate and parse the search params into a typed state
    return {
      page: Number(search.page),
      limit: Number(search.limit),
    };
  },
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: ({ context: { queryClient }, deps: { page, limit } }) =>
    queryClient.ensureQueryData(imagesQueryOptions(page, limit)),
  component: ImagesPage,
  errorComponent: LoadingError,
});
