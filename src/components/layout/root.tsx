import { Link, Outlet } from '@tanstack/react-router';
import { ReactNode } from 'react';

const Root = (): ReactNode => (
  <div className="container mx-auto px-4">
    <header className="border-b py-4">
      <h1 className="mb-4 text-3xl text-teal-800">Snowplow Tech Challenge</h1>
      <Link
        to="/"
        className="text-lg underline underline-offset-4 transition-all hover:underline-offset-2"
      >
        Home
      </Link>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

export default Root;
