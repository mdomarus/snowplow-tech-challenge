import { imageQueryOptions } from '@/api/imageQueryOptions';
import Button from '@/components/button';
import FormFieldContainer from '@/components/form-field-container';
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

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateParams({
      blur: blurState,
      grayscale: grayscaleState,
      width: widthState,
      height: heightState,
    });
  };

  return (
    <div className="mt-4 block">
      <form className="flex-col px-4 md:float-left md:w-1/3" onSubmit={submit}>
        <div className="flex flex-wrap justify-center gap-8">
          <FormFieldContainer name="grayscale" label="Grayscale">
            <input
              disabled={inProgress}
              type="checkbox"
              id="grayscale"
              checked={grayscaleState}
              onChange={(e) => {
                setGrayscale(e.target.checked);
                updateParams({
                  grayscale: e.target.checked,
                  width: widthState,
                  height: heightState,
                });
              }}
            />
          </FormFieldContainer>
          <FormFieldContainer name="blur" label="Blur">
            <input
              disabled={inProgress}
              type="range"
              id="blur"
              min="0"
              max="10"
              value={blurState}
              onChange={(e) => {
                setBlur(Number(e.target.value));
                updateParams({
                  blur: Number(e.target.value),
                  width: widthState,
                  height: heightState,
                });
              }}
            />
          </FormFieldContainer>
          <FormFieldContainer name="width" label="Width">
            <Input
              disabled={inProgress}
              type="text"
              id="width"
              inputMode="numeric"
              pattern="[0-9]*"
              value={widthState}
              onChange={(e) => {
                const width = Number(e.target.value);
                if (!Number.isNaN(width)) {
                  setWidth(Number(width));
                }
              }}
            />
          </FormFieldContainer>
          <FormFieldContainer name="height" label="Height">
            <Input
              disabled={inProgress}
              type="text"
              id="height"
              inputMode="numeric"
              pattern="[0-9]*"
              value={heightState}
              onChange={(e) => {
                const height = Number(e.target.value);
                if (!Number.isNaN(height)) {
                  setHeight(Number(height));
                }
              }}
            />
          </FormFieldContainer>
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-4">
          <Button type="submit" disabled={inProgress}>
            Submit
          </Button>
          <Button type="reset" disabled={inProgress} onClick={reset}>
            Reset
          </Button>
        </div>
        <div className="my-4">
          Set the <em>width</em> to <code>0</code> for the original size.
          <br />
          Set the <em>height</em> to <code>0</code> for a square aspect ratio.
        </div>
      </form>

      <img
        className={cn('bg-white p-1 md:w-2/3', {
          'opacity-80': inProgress,
        })}
        src={data}
        alt="edited image"
      />
    </div>
  );
};

export default ImagePage;
