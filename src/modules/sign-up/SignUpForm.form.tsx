import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(1),
  jobTitle: z.string().min(1),
  companyName: z.string().min(1),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  logo: z.instanceof(File).optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
