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
    <div className="flex items-center">
      <label className="my-2 mr-4" htmlFor={name}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormFieldContainer;
