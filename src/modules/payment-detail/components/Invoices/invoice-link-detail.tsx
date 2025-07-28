import { ChevronRight } from "lucide-react";
import { ComponentProps, useState } from "react";

import { TransactionRead } from "@/api";
import { Dialog, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InvoiceDetail } from "./invoice-detail";

type InvoiceLinkDetailProps = {
  invoice?: TransactionRead | null;
  client: ComponentProps<typeof InvoiceDetail>["client"];
  customTrigger?: React.ReactNode;
};

export const InvoiceLinkDetail = ({
  client,
  invoice,
  customTrigger,
}: InvoiceLinkDetailProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        {customTrigger ? (
          customTrigger
        ) : (
          <ChevronRight className="text-[#5D6C87] cursor-pointer" />
        )}
      </DialogTrigger>
      <DialogTitle hidden />
      {invoice && (
        <InvoiceDetail
          client={client}
          invoice={invoice}
          setIsOpen={(state) => setIsOpen(state)}
        />
      )}
    </Dialog>
  );
};
