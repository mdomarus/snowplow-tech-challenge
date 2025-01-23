import { act, render, screen } from '@/utils/test-utils';
import ImageListItem from './image-list-item';
import { ImageType } from '@/api/images';

const imageData: ImageType = {
  id: '1',
  width: 1200,
  author: 'John Doe',
  height: 800,
  url: 'https://picsum.photos/id/1/5616/3744',
  download_url: 'https://picsum.photos/id/1/5616/3744',
};

describe('ImageListItem', () => {
  it('should not crash with incorrect data', async () => {
    await act(() =>
      render(<ImageListItem image={null as unknown as ImageType} />),
    );
  });

  it('should render the image', async () => {
    await act(() => render(<ImageListItem image={imageData} />));
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('style')).toEqual(
      'background-image: url(https://picsum.photos/id/1/600/400);',
    );
  });

  it('should render author name', async () => {
    await act(() => render(<ImageListItem image={imageData} />));
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
