import { DEFAULT_PAGE_SIZE } from '@/constants';
import { Link, Outlet } from '@tanstack/react-router';
import { ReactNode } from 'react';

const Root = (): ReactNode => (
  <div className="container mx-auto px-4">
    <header className="border-b py-4">
      <h1 className="mb-4 text-3xl text-teal-800">Snowplow Tech Challenge</h1>
      <Link
        to="/images"
        search={{ page: 1, limit: DEFAULT_PAGE_SIZE }}
        className="text-lg underline underline-offset-4 transition-all hover:text-teal-800 hover:underline-offset-2"
      >
        Images list
      </Link>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

export default Root;
