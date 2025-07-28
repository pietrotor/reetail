import { JSX } from "react";

import browGradient from "@/assets/gradients/brownGradient.svg";
import burgundyGradient from "@/assets/gradients/burgundyGradient.svg";

export default function SignupLayout({
  children,
  className,
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
}) {
  return (
    <main className="flex flex-col bg-[#F6F6F6] min-h-screen max-w-screen center py-8">
      <div className={`w-full h-full z-50 ${className}`}>{children}</div>
      {[
        {
          src: browGradient,
          className: "left-0",
        },
        {
          src: burgundyGradient,
          className: "right-0",
        },
      ].map(({ src, className }, i) => (
        <img
          key={i}
          src={src}
          className={`fixed select-none bottom-0 ${className}`}
        />
      ))}
      <div className="flex gap-[15px] text-xs opacity-50 mt-10">
        <span>c2025 Conduit.com</span>
        <div className="border-s" />
        <div className="flex gap-[18px]">
          {[
            {
              label: "Terms",
              path: "",
            },
            {
              label: "PrivacyPolicy",
              path: "",
            },
          ].map(({ label, path }, i) => (
            <a key={i} href={path} className="underline underline-offset-2">
              {label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
