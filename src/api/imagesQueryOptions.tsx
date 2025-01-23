import { fetchImages } from '@/api/images';
import { DEFAULT_PAGE_SIZE } from '@/main';
import { keepPreviousData, queryOptions } from '@tanstack/react-query';

export const imagesQueryOptions = (
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
) =>
  queryOptions({
    queryKey: ['images', page, limit],
    queryFn: () => fetchImages(page, limit),
    placeholderData: keepPreviousData,
    throwOnError: true,
    staleTime: 1000 * 60 * 5, // 5 minutes in milliseconds
  });
