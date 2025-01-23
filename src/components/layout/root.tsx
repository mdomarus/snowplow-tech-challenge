import { Link, Outlet } from '@tanstack/react-router';
import { ReactNode } from 'react';

const Root = (): ReactNode => (
  <div className="container mx-auto px-4">
    <header className="border-b py-4">
      <Link to="/" className="text-xl text-teal-800">
        Home
      </Link>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

export default Root;
