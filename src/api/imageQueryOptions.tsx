import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { fetchImage, FetchImageParams } from '@/api/images';

export const imageQueryOptions = (params: FetchImageParams) =>
  queryOptions({
    queryKey: [
      'image',
      params.blur,
      params.grayscale,
      params.height,
      params.id,
      params.width,
    ],
    queryFn: () => fetchImage(params),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });
