import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ClientSignUpForm } from "../types";

type useClientSignUpFormProps = {
  data?: Partial<ClientSignUpForm> | null;
};

export const useClientSignUpForm = ({
  data,
}: useClientSignUpFormProps = {}) => {
  const [appliedDefaultValues, setAppliedDefaultValues] = useState(false);
  const form = useForm<ClientSignUpForm>({
    mode: "onTouched",
  });

  useEffect(() => {
    if (!data) return;
    if (appliedDefaultValues) return;

    form.reset({
      full_name: data.full_name,
      company_name: data.company_name,
      job_title: data.job_title,
      email: data.email,
      username: data.username,
      address: data.address,
      ein: data.ein,
      logo: data.logo,
      paymentMethod: data.paymentMethod,
    });
    setAppliedDefaultValues(true);
  }, [data, appliedDefaultValues]);

  return {
    form,
  };
};
