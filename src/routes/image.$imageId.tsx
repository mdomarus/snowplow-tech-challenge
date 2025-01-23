import { imageQueryOptions } from '@/api/imageQueryOptions';
import LoadingError from '@/components/layout/loading-error';
import ImagePage from '@/pages/image-page';
import { createFileRoute } from '@tanstack/react-router';

export interface ImagePageSearchParams {
  grayscale: boolean;
  blur: number;
  width: number;
  height?: number;
}

export const Route = createFileRoute('/image/$imageId')({
  validateSearch: (search: Record<string, unknown>): ImagePageSearchParams => {
    // validate and parse the search params into a typed state
    const blur = Number(search.blur);
    const width = Number(search.width);
    const height = Number(search.height);

    return {
      grayscale: Boolean(search?.grayscale),
      blur: isNaN(blur) ? 0 : blur,
      width: isNaN(width) ? 0 : width,
      height: isNaN(height) ? width : height,
    };
  },
  loader: ({ context: { queryClient }, params: { imageId } }) => {
    return queryClient.ensureQueryData(imageQueryOptions({ id: imageId }));
  },
  errorComponent: LoadingError,
  component: ImagePage,
});
