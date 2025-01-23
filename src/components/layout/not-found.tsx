import Button from '@/components/button';
import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';

const NotFound = (): ReactNode => (
  <div className="py-8">
    <p>
      This is the <code>NotFound Component</code> configured on root route.
    </p>
    <Link to="/" className="mt-4 block">
      <Button>Start Over</Button>
    </Link>
  </div>
);

export default NotFound;
