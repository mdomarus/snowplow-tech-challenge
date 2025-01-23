import { PaginationProps } from '@/components/pagination';
import { DEFAULT_PAGE_SIZE } from '@/main';
import axios from 'axios';

export type ImageType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export interface FetchImageParams {
  id: string;
  width?: number;
  height?: number;
  blur?: number;
  grayscale?: boolean;
}

export const fetchImage = async ({
  id,
  width = 0,
  height,
  blur = 0,
  grayscale,
}: FetchImageParams): Promise<string> => {
  return axios
    .get(
      `https://picsum.photos/id/${id}/${width}/${height ? height : ''}?${grayscale ? 'grayscale&' : ''}${blur > 0 ? `blur=${blur}` : ''}`,
      { responseType: 'arraybuffer' },
    )
    .then((response) => {
      const image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );

      return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
    });
};

const getPaginationProps = (linkHeader: string = ''): PaginationProps => {
  const links = linkHeader.split(',').map((link) => {
    const [, rel] = link.split(';').map((s) => s.trim());
    return rel;
  });

  const hasNext = links.some((link) => link.match(/next/i));
  const hasPrev = links.some((link) => link.match(/prev/i));

  return { hasNext, hasPrev };
};

export const fetchImages = async (
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<
  PaginationProps & {
    items: ImageType[];
  }
> => {
  return axios
    .get<
      Array<ImageType>
    >(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((r) => ({ items: r.data, ...getPaginationProps(r.headers?.link) }));
};
