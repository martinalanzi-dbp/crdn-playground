import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-white px-3 text-sm text-neutral-900 shadow-xs transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-500 hover:border-neutral-300 focus-visible:border-primary-100 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500 aria-invalid:border-error-100 aria-invalid:ring-2 aria-invalid:ring-error-100/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
