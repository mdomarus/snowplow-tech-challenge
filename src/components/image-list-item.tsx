import { ImageType } from '@/api/images';
import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';

const ImageListItem = ({ image }: { image: ImageType }): ReactNode => {
  const backgroundImageUrl = image.download_url
    .split('/')
    .slice(0, -2)
    .concat('600/400')
    .join('/');

  return (
    <li key={image.id}>
      <Link
        to="/image/$imageId"
        params={{
          imageId: image.id,
        }}
        search={{ blur: 0, grayscale: false, width: 0 }}
      >
        <div className="flex flex-col overflow-hidden rounded-xl bg-white text-black shadow">
          <div
            className="aspect-[3/2] overflow-hidden bg-slate-50 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImageUrl})`,
            }} // dynamic url
          />
          <div className="flex justify-between">
            <div className="p-4">{image.author}</div>
            <div className="p-4">ID: {image.id}</div>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default ImageListItem;
