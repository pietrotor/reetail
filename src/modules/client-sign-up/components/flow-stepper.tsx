import { useClientSignUpStore } from "../ClientSignUp.store";

const STEPS_VALUES = ["payment-preference", "profile", "consent", "signature"];
const STEPS_LABELS = [
  "Pick your ACH preference",
  "Let’s get to know you",
  "Let’s set up your payment gateway",
  "Let’s finish up",
];

type FlowStepperProps = {
  isPaymentMethodSelected?: boolean;
};

export default function FlowStepper({
  isPaymentMethodSelected = true,
}: FlowStepperProps) {
  const step = useClientSignUpStore((state) => state.step);

  const currentStep = isPaymentMethodSelected
    ? STEPS_VALUES.slice(1).findIndex((s) => s === step)
    : STEPS_VALUES.findIndex((s) => s === step);

  return (
    <div className="flex flex-col center">
      <h1 className="text-[22px] font-medium">Step {currentStep + 1}.</h1>
      <p className="text-lg">{STEPS_LABELS[currentStep]}</p>
      <div className="flex gap-[3px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-[66.5px] h-[4px] rounded-full ${
              i <= currentStep ? "bg-[#D6B2BF]" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
