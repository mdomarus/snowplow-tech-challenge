import { fetchImage, FetchImageParams } from '@/api/images';
import { keepPreviousData, queryOptions } from '@tanstack/react-query';

export const imageQueryOptions = (params: FetchImageParams) =>
  queryOptions({
    queryKey: ['image', params],
    queryFn: () => fetchImage(params),
    placeholderData: keepPreviousData,
    throwOnError: true,
    staleTime: Infinity, // never invalidate the cache
  });
