import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent font-normal tracking-button whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-400 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-200",
        outline:
          "border-border bg-white text-neutral-900 shadow-xs hover:bg-neutral-50 [&_svg]:text-neutral-500",
        secondary:
          "border-border bg-white text-neutral-900 shadow-xs hover:bg-neutral-50 [&_svg]:text-neutral-500",
        ghost:
          "text-neutral-700 hover:bg-alpha-dark-50 hover:text-neutral-900 disabled:border-transparent disabled:bg-transparent",
        destructive: "bg-error-200 text-white hover:bg-error-300",
        success: "bg-success-200 text-white hover:bg-success-300",
        link: "text-link underline-offset-4 hover:underline"
      },
      size: {
        default:
          "h-9 gap-2 px-4 text-base [&_svg:not([class*='size-'])]:size-4",
        sm: "h-9 gap-2 px-4 text-base [&_svg:not([class*='size-'])]:size-4",
        md: "h-11 gap-2 px-6 text-lg [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9 [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-9 [&_svg:not([class*='size-'])]:size-5",
        "icon-md": "size-11 [&_svg:not([class*='size-'])]:size-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
