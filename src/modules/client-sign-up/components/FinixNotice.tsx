import { Loader } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { SignUpFormContainer } from "./sign-up-form-container";
import { useClientSignUpStore } from "../ClientSignUp.store";

const FINIX_ID = import.meta.env.VITE_FINIX_ID;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const FinixNotice = () => {
  const setStep = useClientSignUpStore((state) => state.actions.setStep);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  console.log("🚀 ~ FinixNotice ~ isFormLoaded:", isFormLoaded);
  const [isLoading, setIsLoading] = useState(false);
  // custom form options https://finix.com/docs/guides/payments/online-payments/payment-details/payment-forms/
  const options = useMemo(
    () => ({
      // show address fields in the form (default is false)
      showAddress: true,
      //show labels in the form (default is true)
      showLabels: true,
      // set custom labels for each field
      labels: {
        // Supported Fields: "name", "number", "expiration_date", "security_code", "account_number", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
        name: "Full Name",
      },
      // turn on or off placeholder text in the fields (default is true)
      showPlaceholders: true,
      // set custom placeholders for each field, you can specify them here
      placeholders: {
        // Supported Fields: "name", "number", "expiration_date", "security_code", "account_number", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
        name: "Full Name",
      },
      defaultValues: {
        // Supported Fields:  "name", "security_code", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
        // name: "John Doe",
      },
      // hide specific fields that you do not need
      hideFields: [
        // Supported Fields: "name", "security_code", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code", "address_country"
        // "name",
        // "address_line1",
        // "address_line2",
        // "address_city",
        //"address_state",
        // "address_region",
        // "address_country",
      ],
      // require any specific fields that are not required by default, you can specify them here
      requiredFields: [
        // Supported Fields: "name", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
        "name",
        "address_line1",
        "address_city",
        "address_region",
        "address_state",
        "address_country",
        "address_postal_code",
      ],
      // if you want to require a field, but not hide input error messages (default is false)
      hideErrorMessages: false,
      // set custom error messages for each field if you are showing error messages
      errorMessages: {
        // Supported Fields: "name", "number", "expiration_date", "security_code", "account_number", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
        name: "Please enter a valid name",
        address_city: "Please enter a valid city",
      },
      // custom styles for the form inputs (optional but recommended)
      styles: {
        // default styling for all fields
        default: {
          color: "#000",
          border: "1px solid #CCCDCF",
          borderRadius: "8px",
          padding: "8px 16px",
          fontFamily: "Noto Sans Thaana",
          fontSize: "16px",
          boxShadow:
            "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 2px 4px rgba(0, 0, 0, 0.03)",
          backgroundColor: "#F7F5F4",
        },
        // specific styling if the field is valid
        success: {
          // color: "#5cb85c",
        },
        // specific styling if the field has errors
        error: {
          // color: "#d9534f",
          border: "1px solid rgba(255,0,0, 0.3)",
        },
      },

      // Define custom fonts for input text. This requires a hosted font file from a CDN and must use HTTPS.
      // To use custom fonts set the fontFamily in the style options above.
      fonts: [
        // Here you can define multiple fonts to use in the input fields.
        {
          fontFamily: "Noto Sans Thaana",
          url: "https://fonts.cdnfonts.com/s/107457/NotoSansThaana[wght].woff",
          format: "woff",
        },
      ],
      // optional callback function that will trigger when form state changes (can be called frequently)
      // onUpdate: function (state, binInformation, formHasErrors) {
      //   // console.log(state);
      //   // console.log(binInformation);
      //   // console.log(formHasErrors);
      // },
      // optional callback function that will trigger after the form has loaded
      onLoad: function () {
        // custom code to run when the form has loaded
        setIsFormLoaded(true);
      },
      // optional callback function that will be called when the form is submitted
      // NOTE: adding this option will automatically create a submit button for you.
      // If you do not want to use the default button and create your own,
      // do not supply this function and instead create your own submit button
      // and attach the onSubmit function to it manually.
      // onSubmit,
      // optional param to set the label for the submit button that is auto generated
      // submitLabel: 'Create Token',
    }),
    []
  );

  const formElementRef = useRef<any>(null);
  const formObjectRef = useRef<any>(null);

  useEffect(() => {
    const Finix = (window as any).Finix;
    // create the form when the component mounts
    if (Finix && formElementRef.current) {
      formObjectRef.current = Finix.CardTokenForm(
        formElementRef.current.id,
        options
      );
    } else {
      console.error("Finix SDK not loaded or form element not found");
    }
  }, [options]);

  const finishFinixIntegration = async (data: any) => {
    await fetch(`${BACKEND_URL}/api/v1/integrations/credit_card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ integration_data: data }),
    });
  };

  // submit function that will be called when the form is submitted
  function onSubmit() {
    setIsLoading(true);
    formObjectRef.current?.submit(
      "sandbox",
      FINIX_ID || "APgPDQrLD52TYvqazjHJJchM",
      function (err: any, res: any) {
        if (err) {
          console.error("Error submitting form:", err);
          toast.error("Something went wrong, please try again.");
          setIsLoading(false);
        }
        // get token ID from response
        const tokenData = res.data || {};
        finishFinixIntegration(tokenData)
          .then(() => {
            setStep("signature");
          })
          .catch((error) => {
            // handle error in finishing integration
            console.error("Error finishing Finix integration:", error);
            toast.error("Something went wrong, please try again.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    );
  }

  return (
    <SignUpFormContainer
      className="justify-between p-6"
      onValidStep={onSubmit}
      cta="finix"
      isLoading={isLoading}
    >
      <div className="flex flex-col gap-[25px] pb-6 relative">
        {!isFormLoaded && (
          <Loader className="absolute top-1/2 left-1/2 animate-spin w-8 h-8" />
        )}
        <div id="form" ref={formElementRef} />
        <p className="text-sm text-center w-[271px] self-center">
          By clicking "Continue" you agree to the{" "}
          <span className="font-semibold underline">
            Finix End User Privacy Policy
          </span>
        </p>
      </div>
    </SignUpFormContainer>
  );
};
