/// <reference types="vite/client" />
// Extend the Window interface to include Finix
declare global {
    interface Window {
        Finix: {
            TokenForm(arg0: string, options: {
                // show address fields in the form (default is false)
                showAddress: boolean;
                //show labels in the form (default is true)
                showLabels: boolean;
                // set custom labels for each field
                labels: {
                    // Supported Fields: "name", "number", "expiration_date", "security_code", "account_number", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
                    name: string;
                };
                // turn on or off placeholder text in the fields (default is true)
                showPlaceholders: boolean;
                // set custom placeholders for each field, you can specify them here
                placeholders: {
                    // Supported Fields: "name", "number", "expiration_date", "security_code", "account_number", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
                    name: string;
                }; defaultValues: {};
                // hide specific fields that you do not need
                hideFields: never[];
                // require any specific fields that are not required by default, you can specify them here
                requiredFields: string[];
                // if you want to require a field, but not hide input error messages (default is false)
                hideErrorMessages: boolean;
                // set custom error messages for each field if you are showing error messages
                errorMessages: {
                    // Supported Fields: "name", "number", "expiration_date", "security_code", "account_number", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
                    name: string; address_city: string;
                };
                // custom styles for the form inputs (optional but recommended)
                styles: {
                    // default styling for all fields
                    default: { color: string; border: string; borderRadius: string; padding: string; fontFamily: string; fontSize: string; boxShadow: string; };
                    // specific styling if the field is valid
                    success: {};
                    // specific styling if the field has errors
                    error: {
                        // color: "#d9534f",
                        border: string;
                    };
                };
                // Define custom fonts for input text. This requires a hosted font file from a CDN and must use HTTPS.
                // To use custom fonts set the fontFamily in the style options above. 
                fonts: { fontFamily: string; url: string; format: string; }[];
                // optional callback function that will trigger when form state changes (can be called frequently)
                onUpdate: (state: any, binInformation: any, formHasErrors: any) => void;
                // optional callback function that will trigger after the form has loaded
                onLoad: () => void;
                // optional callback function that will be called when the form is submitted
                // NOTE: adding this option will automatically create a submit button for you.
                // If you do not want to use the default button and create your own,
                // do not supply this function and instead create your own submit button
                // and attach the onSubmit function to it manually.
                onSubmit: () => void;
                // optional param to set the label for the submit button that is auto generated
                submitLabel: string;
            }): unknown;
            CardTokenForm: (elementId: string, options: any) => any;
        };
    }
}
