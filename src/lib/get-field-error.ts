import { get } from "react-hook-form";

export const fieldError = (errors: any, field: string) => {
  return get(errors, field)?.message;
};
