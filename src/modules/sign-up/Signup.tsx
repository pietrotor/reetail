// import EmailConfirmation from "./components/email-confirmation";
import SignupLayout from "./components/sign-up-layout";
import { SignUpForm } from "./components/SignUpForm";

export default function Signup() {
  return (
    <SignupLayout>
      <SignUpForm isVendor />
      {/* <EmailConfirmation /> */}
    </SignupLayout>
  );
}
