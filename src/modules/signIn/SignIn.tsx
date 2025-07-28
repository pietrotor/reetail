import { SignInForm } from "./components/SignInForm";
import SignupLayout from "../sign-up/components/sign-up-layout";

export const SignIn = () => {
  return (
    <SignupLayout>
      <SignInForm />
      {/* <EmailConfirmation /> */}
    </SignupLayout>
  );
};
