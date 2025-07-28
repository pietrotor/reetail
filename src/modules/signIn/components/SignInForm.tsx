import { useRef, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import { useLogin } from "@/api/custom";
import ConduitCommerceLogo from "@/assets/images/conduitCommerceLogo.png";
import GoogleIcon from "@/assets/images/googleIcon.png";
import MicrosoftIcon from "@/assets/images/microsoftIcon.png";
import { Button, Input } from "@/components/ui";

export const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { onFetch, isLoading } = useLogin();

  const [form, setForm] = useState({
    inputs: { email: "", password: "" },
    errors: { email: "", password: "", formError: "" },
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

    onFetch({
      body: {
        username: form.inputs.email,
        password: form.inputs.password,
      },
      onSuccess: () => {
        window.location.href = "/dashboard";
      },
      onError: () => {
        toast.error("Email or password is incorrect");
      },
    });
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
                window.location.href = `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/v1/users/login/google`;
              },
            },
            {
              label: "Sign up with Microsoft",
              image: MicrosoftIcon,
              onClick: () => {
                window.location.href = `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/v1/users/login/microsoft`;
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
        <div className="flex items-center justify-center w-full relative">
          <div className="absolute right-0 h-0.5 bg-gradient-to-l from-transparent to-[#1F1F21] w-[45%]" />
          <span className=" text-lg z-45 relative">or</span>
          <div className="absolute left-0 h-0.5 bg-gradient-to-r from-transparent to-[#1F1F21] w-[45%]" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Input
              type="email"
              ref={emailRef}
              name="email"
              className="w-full bg-white p-3.5 py-5 rounded-[8px] outline-none"
              placeholder="Email"
              onChange={onInputChange}
            />
            {form.errors.email !== "" && (
              <span className="pl-2 text-red-500 text-sm">
                {form.errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Input
              type="password"
              ref={passwordRef}
              name="password"
              className="w-full bg-white p-3.5 py-5 rounded-[8px] outline-none"
              placeholder="Password"
              onChange={onInputChange}
            />
            {form.errors.email !== "" && (
              <span className="pl-2 text-red-500 text-sm">
                {form.errors.email}
              </span>
            )}
          </div>
        </div>
        {form.errors.formError !== "" && (
          <span className="pl-2 text-red-500 text-sm">
            {form.errors.formError}
          </span>
        )}
        <Button
          ref={buttonRef}
          onClick={onButtonClick}
          className="rounded-xl p-4 w-full button-gradient text-white text-sm cursor-pointer h-auto"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        <p>
          Don’t have an account?{" "}
          <Link to="/signup" className="font-bold underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
