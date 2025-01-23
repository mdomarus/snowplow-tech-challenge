import { imagesQueryOptions } from '@/api/imagesQueryOptions';
import ImageListItem from '@/components/image-list-item';
import Loading from '@/components/layout/loading';
import Pagination from '@/components/pagination';
import { Route } from '@/routes/images';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from '@tanstack/react-router';

const ImagesPage = (): ReactNode => {
  const { page, limit } = Route.useSearch();
  const { data, isLoading } = useQuery(imagesQueryOptions(page, limit));

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 border-b py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.items.map((image) => (
          <ImageListItem key={image.id} image={image} />
        ))}
      </ul>
      <Pagination hasNext={data?.hasNext} hasPrev={data?.hasPrev} />
    </>
  );
};

export default ImagesPage;
