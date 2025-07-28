import orangeGradient from "@/assets/gradients/orangeGradient.svg";
import { BooksIcon } from "@/components/icons/Books.icon";
import { LightningIcon } from "@/components/icons/Lightning.icon";
import { PeopleIcon } from "@/components/icons/People.icon";
import { SparklesIcon } from "@/components/icons/Sparkles.icon";
import { DialogContent } from "@/components/ui/dialog";

export const Paywall = () => {
  return (
    <>
      <DialogContent className="min-w-[611px] py-6 flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <div className="flex items-center justify-center rounded-full success-bg p-4 w-full relative">
            <div className="absolute h-full w-full overflow-hidden flex items-center justify-center">
              <img
                src={orangeGradient}
                className={`select-none rotate-[15deg] h-[216px] shrink-0`}
              />
            </div>
            <BooksIcon />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-2/3">
            <h1 className="text-xl font-bold">
              Looks like you've hit the limit.
            </h1>
            <p className="text-sm text-gray-500 text-center">
              Upgrade now to add unlimited customers and keep things running
              smoothly.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-2/3 my-4">
            <button className="flex button-gradient text-sm font-normal h-[45px] w-full px-[25px] cursor-pointer text-white center rounded-[6px] gap-[5px]">
              Upgrade to scale
            </button>
          </div>

          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex gap-2 items-center">
              <div className="icon-gradient box-border rounded-md border-[0.5px] border-solid border-[#57565F] h-[25px] w-[25px] flex items-center justify-center">
                <LightningIcon />
              </div>
              <span>Keep everything</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="icon-gradient box-border rounded-md border-[0.5px] border-solid border-[#57565F] h-[25px] w-[25px] flex items-center justify-center">
                <PeopleIcon />
              </div>
              <span>Add unlimited customers</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="icon-gradient box-border rounded-md border-[0.5px] border-solid border-[#57565F] h-[25px] w-[25px] flex items-center justify-center">
                <SparklesIcon />
              </div>
              <span>Unlock AI tools</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  );
};
