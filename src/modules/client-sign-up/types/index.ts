import { PaymentMethod } from "@/api";

export type ClientSignUpForm = {
  username: string;
  full_name: string;
  password: string;
  job_title: string;
  email: string;
  company_name: string;
  ein?: string;
  logo: string;
  address: string;
  paymentMethod?: PaymentMethod | null;
};
