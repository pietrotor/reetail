type FormErrorProps = {
  error: string | null | undefined;
};

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;

  return <span className="text-xs text-red-500 mt-1.5">{error}</span>;
};
