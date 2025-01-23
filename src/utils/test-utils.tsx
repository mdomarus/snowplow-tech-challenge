import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Router,
  RouterProvider,
} from '@tanstack/react-router';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  const rootRoute = createRootRoute();

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/test',
    component: () => <>{children}</>,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    basepath: '/test',
    context: {
      queryClient,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router={router as unknown as Router<any, any, any>}
      />
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
