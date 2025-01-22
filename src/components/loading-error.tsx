import Button from '@/components/button';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import {
  ErrorComponent,
  ErrorComponentProps,
  useRouter,
} from '@tanstack/react-router';
import { useEffect } from 'react';

const LoadingError = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div className="my-8 flex flex-col items-center">
      <ErrorComponent error={error} />
      <Button
        className="mt-4"
        onClick={() => {
          router.invalidate();
        }}
      >
        Retry
      </Button>
    </div>
  );
};

export default LoadingError;
