import { imageQueryOptions } from '@/api/imageQueryOptions';
import Button from '@/components/button';
import Input from '@/components/input';
import Loading from '@/components/loading';
import { ImagePageSearchParams, Route } from '@/routes/image.$imageId';
import { cn } from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const ImagePage = () => {
  const { imageId } = Route.useParams();
  const { grayscale, blur, width, height } = Route.useSearch();
  const { data, isLoading, isFetching, isPending } = useQuery(
    imageQueryOptions({ id: imageId, blur, grayscale, width, height }),
  );
  const navigate = useNavigate({ from: Route.path });
  const [grayscaleState, setGrayscale] = useState(grayscale);
  const [blurState, setBlur] = useState(blur);
  const [widthState, setWidth] = useState(width);
  const [heightState, setHeight] = useState(height);

  const updateParams = useDebouncedCallback(
    (params: Partial<ImagePageSearchParams>) => {
      navigate({
        search: (prev: ImagePageSearchParams) => ({
          ...prev,
          ...params,
        }),
      });
    },
    500,
  );

  if (isLoading) {
    return <Loading />;
  }

  const inProgress = isFetching || isPending;

  const reset = () => {
    setGrayscale(false);
    setBlur(0);
    setWidth(0);
    setHeight(0);
    updateParams({ grayscale: false, blur: 0, width: 0, height: 0 });
  };

  return (
    <div>
      <form className="my-8 flex flex-wrap justify-center gap-8">
        <div className="flex">
          <label className="my-2 mr-4" htmlFor="grayscale">
            Grayscale
          </label>
          <input
            disabled={inProgress}
            type="checkbox"
            name="grayscale"
            checked={grayscaleState}
            onChange={(e) => {
              setGrayscale(e.target.checked);
              updateParams({ grayscale: e.target.checked });
            }}
          />
        </div>
        <div className="flex">
          <label className="my-2 mr-4" htmlFor="blur">
            Blur
          </label>
          <input
            disabled={inProgress}
            type="range"
            name="blur"
            min="0"
            max="10"
            value={blurState}
            onChange={(e) => {
              setBlur(Number(e.target.value));
              updateParams({ blur: Number(e.target.value) });
            }}
          />
        </div>
        <div className="flex">
          <label className="my-2 mr-4" htmlFor="width">
            Width
          </label>
          <Input
            disabled={inProgress}
            type="number"
            name="width"
            min="0"
            step="1"
            value={widthState}
            onChange={(e) => {
              const width = Number(e.target.value);
              setWidth(width);
              updateParams({ width, height: heightState || width });
            }}
          />
        </div>
        <div className="flex">
          <label className="my-2 mr-4 text-nowrap" htmlFor="height">
            Height
          </label>
          <Input
            disabled={inProgress}
            type="number"
            name="height"
            step="1"
            min="0"
            value={heightState}
            onChange={(e) => {
              const height = Number(e.target.value);
              setHeight(height);
              updateParams({ height });
            }}
          />
        </div>
        <Button type="reset" onClick={reset}>
          Reset
        </Button>
        <legend>
          Set the <em>width</em> to <code>0</code> for the original size. Set
          the <em>height</em> to <code>0</code> for a square aspect ratio.
        </legend>
      </form>
      <div>
        <img
          className={cn('mx-auto bg-white p-1', { 'opacity-80': inProgress })}
          src={data}
          alt="edited image"
        />
      </div>
    </div>
  );
};

export default ImagePage;
