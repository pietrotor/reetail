import { Plus } from "lucide-react";

import { Button } from "@/components/ui";
import { Dialog, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewPaymentTermForm } from "@/modules/new-payment-term/NewPaymentTermForm";
import {
  useNewPaymentTermStore,
  useNewPaymentTermStoreActions,
} from "@/modules/new-payment-term/NewPaymentTermForm.store";
import { useCurrentUserStore } from "@/store/use-current-user";

export default function DashboardHeader() {
  const { onOpenChange } = useNewPaymentTermStoreActions();
  const isOpen = useNewPaymentTermStore((state) => state.isOpen);
  const { full_name } = useCurrentUserStore();

  const {
    actions: { changeIsClient },
    isClient,
  } = useCurrentUserStore();

  return (
    <div className="flex w-full justify-between items-center py-2.5 px-[26px] bg-gradient-to-b from-[#F5F5F5] to-white border-b min-h-[66px]">
      <span>Welcome back, {full_name?.split(" ")[0]}</span>

      <div className="flex items-center gap-5">
        {!isClient && (
          <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
              //clean up
              onOpenChange(isOpen);
            }}
          >
            <DialogTitle hidden />
            <DialogTrigger className="flex button-gradient text-sm font-normal h-[45px] px-[25px] cursor-pointer text-white center rounded-[6px] gap-[5px]">
              <Plus width={15} height={15} />
              <span>New payment term</span>
            </DialogTrigger>
            <NewPaymentTermForm />
            {/* 
          when they've reached limit
          <Paywall /> 
        */}
          </Dialog>
        )}
        <Button
          variant={!isClient ? "default" : "outline"}
          onClick={changeIsClient}
        >
          {!isClient ? "Vendor mode" : "Client mode"}
        </Button>
      </div>
    </div>
  );
}
