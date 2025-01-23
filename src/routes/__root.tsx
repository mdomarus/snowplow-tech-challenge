import Button from '@/components/button';
import { QueryClient } from '@tanstack/react-query';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="py-8">
        <p>This is the notFoundComponent configured on root route.</p>
        <Link to="/" className="mt-4 block">
          <Button>Start Over</Button>
        </Link>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <div className="container mx-auto px-4">
      <div className="border-b py-4">
        <Link to="/" className="text-xl text-teal-800">
          Home
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
