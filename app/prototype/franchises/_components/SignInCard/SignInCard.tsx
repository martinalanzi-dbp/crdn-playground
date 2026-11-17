import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface SignInCardProps {
  className?: string;
  children: ReactNode;
}

/** Centered white card on the grey page, shared by every sign-in state (Figma "Sign In"). */
const SignInCard = ({ className, children }: SignInCardProps) => (
  <main className="flex min-h-screen items-center justify-center bg-neutral-50">
    <div
      className={cn(
        "flex w-118.75 flex-col items-center justify-center gap-4 bg-white p-12 shadow-xs",
        className
      )}
    >
      <Image
        src="/assets/images/crdn-logo-brand.svg"
        alt="CRDN"
        width={91.514}
        height={24}
        priority
      />
      {children}
    </div>
  </main>
);

export default SignInCard;
