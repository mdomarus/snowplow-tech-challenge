import { imageQueryOptions } from '@/api/imageQueryOptions';
import LoadingError from '@/components/loading-error';
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
    return {
      grayscale: Boolean(search?.grayscale),
      blur: Number(search?.blur ?? 0),
      width: Number(search?.width ?? 0),
      height: Number(search?.height || search?.width),
    };
  },
  loader: ({ context: { queryClient }, params: { imageId } }) => {
    return queryClient.ensureQueryData(imageQueryOptions({ id: imageId }));
  },
  errorComponent: LoadingError,
  component: ImagePage,
});
