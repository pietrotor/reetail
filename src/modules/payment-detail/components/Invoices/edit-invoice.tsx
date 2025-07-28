import {
    Dialog,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { OneTimeInvoiceForm } from "./one-time-invoice-form";

type PaymentDetailProps = {
  paymentId: string;
};

const EditInvoice: React.FC<PaymentDetailProps> = ({ paymentId }) => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Take edit invoice action to this component

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
      <DialogTitle hidden />
      <DialogTrigger className="flex button-gradient text-sm font-normal h-[45px] px-[25px] cursor-pointer text-white center rounded-[6px] gap-[5px]">
        <Plus width={15} height={15} />
        <span>Add invoice</span>
      </DialogTrigger>
      <OneTimeInvoiceForm
        onClose={() => setIsOpen(false)}
        onSubmit={() => {
          setIsOpen(false);
        }}
        paymentTermId={paymentId}
      />
    </Dialog>
  );
};

export default EditInvoice;
