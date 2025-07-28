import EmailConfirmation from "./components/email-confirmation";
import SignupLayout from "./components/sign-up-layout";

export default function VerifyEmailPage() {
  return (
    <SignupLayout>
      <EmailConfirmation />
    </SignupLayout>
  );
}
