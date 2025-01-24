import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes } from 'react';

const Button = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md bg-teal-50 px-4 py-2 text-sm font-medium whitespace-nowrap text-teal-800 shadow transition-colors hover:bg-teal-100 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
