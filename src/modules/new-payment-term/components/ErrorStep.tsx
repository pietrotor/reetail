import { SuccessSentIcon } from "@/components/icons";
import { Button } from "@/components/ui";

export const ErrorStep = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center rounded-full success-bg p-4 w-full ">
        <SuccessSentIcon />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-2/3">
        <h1 className="text-2xl font-bold text-red-400 text-center">
          Ups, something went wrong.
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-2/3">
        <Button variant="outline" className="w-full">
          Try again
        </Button>
      </div>
    </div>
  );
};
