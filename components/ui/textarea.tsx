import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-neutral-900 shadow-xs transition-colors outline-none placeholder:text-neutral-500 hover:border-neutral-300 focus-visible:border-primary-100 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-neutral-100 aria-invalid:border-error-100 aria-invalid:ring-2 aria-invalid:ring-error-100/20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
