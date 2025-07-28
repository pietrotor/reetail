import { useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import {
  useLoginWithGoogleApiV1UsersLoginGoogleGet,
  useLoginWithMicrosoftApiV1UsersLoginMicrosoftGet,
  useVerifyEmailEndpointApiV1UsersVerifyPost,
} from "@/api";
import ConduitCommerceLogo from "@/assets/images/conduitCommerceLogo.png";
import GoogleIcon from "@/assets/images/googleIcon.png";
import MicrosoftIcon from "@/assets/images/microsoftIcon.png";
import { Button, Input } from "@/components/ui";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// function validate(values: FormValues) {
//   const errors: Partial<FormValues> = {};
//   if (!values.email) {
//     errors.email = "Email is required";
//   } else {
//     if (!validateEmail(values.email)) {
//       errors.email = "Invalid email";
//     }
//   }

//   if (!values.password) {
//     errors.password = "Password is required";
//   }
//   return errors;
// }

export const SignUpForm = ({ isVendor = false }: { isVendor?: boolean }) => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [searchParams] = useSearchParams();
  const verifyEmail = useVerifyEmailEndpointApiV1UsersVerifyPost();
  const { refetch: loginWithMicrosoft } =
    useLoginWithMicrosoftApiV1UsersLoginMicrosoftGet({
      query: {
        enabled: false,
      },
    });
  const { refetch: loginWithGoogle } =
    useLoginWithGoogleApiV1UsersLoginGoogleGet({
      query: {
        enabled: false,
      },
    });
  const payment_term_id = searchParams.get("payment_term_id");
  // TODO: Use zod to validate the form
  const [form, setForm] = useState({
    inputs: { email: "" },
    errors: { email: "", formError: "" },
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      errors: { email: "", password: "", formError: "" },
    }));
    if (e.target.value && buttonRef.current?.classList.contains("opacity-0")) {
      buttonRef.current?.classList.remove("opacity-0");
    } else if (
      !e.target.value &&
      !buttonRef.current?.classList.contains("opacity-0")
    ) {
      buttonRef.current?.classList.add("opacity-0");
    }
    setForm((prev) => ({
      ...prev,
      inputs: { ...prev.inputs, [e.target.name]: e.target.value },
    }));
  };

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateEmail(form.inputs.email || "")) {
      verifyEmail.mutate(
        {
          params: {
            email: form.inputs.email?.trim(),
          },
        },
        {
          onSuccess: () => {
            sessionStorage.setItem("payment_term_id", String(payment_term_id));
            navigate(
              "/signup/verify-email?&email=" +
                form.inputs.email +
                (payment_term_id ? `&payment_term_id=${payment_term_id}` : "") +
                (isVendor ? `&isVendor=true` : "")
            );
          },
        }
      );
    } else {
      setForm((prev) => ({
        ...prev,
        errors: { email: "Invalid email", formError: "" },
      }));
    }
  };

  return (
    <div className="flex flex-col w-full h-full center gap-[50px]">
      <div className="flex flex-col gap-[25px] center">
        <img
          src={ConduitCommerceLogo}
          alt="Conduit Commerce Logo"
          className="h-12"
        />
        <div className="flex flex-col center gap-[15px]">
          <h1 className="text-[22px] font-medium">Welcome back!</h1>
          {/* <h2 className="w-[350px] text-center text-lg">
            Conduit Commerce is inviting you to enroll in Automatic ACH
            payments.
          </h2> */}
        </div>
        <div className="flex flex-col gap-5 center w-[432px]">
          {[
            {
              label: "Sign up with Google",
              image: GoogleIcon,
              onClick: () => {
                loginWithGoogle();
              },
            },
            {
              label: "Sign up with Microsoft",
              image: MicrosoftIcon,
              onClick: () => {
                loginWithMicrosoft();
              },
            },
          ].map(({ label, image, onClick }, i) => (
            <button
              key={i}
              className="flex gap-2 center bg-white rounded-[8px] p-3 w-full cursor-pointer"
              onClick={onClick}
            >
              <img src={image} />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8 w-[432px] center h-auto">
        <span className="text-lg">Or use your work email...</span>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Input
              type="email"
              ref={emailRef}
              name="email"
              className="w-full bg-white p-3.5 py-5 rounded-[8px] outline-none"
              placeholder="jonathan@smith.com"
              onChange={onInputChange}
            />
            {form.errors.email !== "" && (
              <span className="pl-2 text-red-500 text-sm">
                {form.errors.email}
              </span>
            )}
          </div>
        </div>
        {form.inputs.email && (
          <>
            {form.errors.formError !== "" && (
              <span className="pl-2 text-red-500 text-sm">
                {form.errors.formError}
              </span>
            )}
            <Button
              ref={buttonRef}
              onClick={onButtonClick}
              className="rounded-xl p-4 w-full button-gradient text-white text-sm cursor-pointer h-auto"
              disabled={verifyEmail.isPending}
            >
              Continue
            </Button>
          </>
        )}
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="font-bold underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
