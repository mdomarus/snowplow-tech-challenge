import { ReactNode } from '@tanstack/react-router';

const FormFieldContainer = ({
  children,
  label,
  name,
}: {
  children: ReactNode;
  label: string;
  name: string;
}): ReactNode => {
  return (
    <div className="flex max-w-64 items-center">
      <label className="my-2 mr-4 min-w-20" htmlFor={name}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormFieldContainer;
