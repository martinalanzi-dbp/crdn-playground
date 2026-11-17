"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle
} from "@/components/ui/sheet";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface SidePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Short sentence for screen readers describing what the panel is for. */
  description: string;
  /** Footer actions, usually a ghost Cancel and a Primary button. */
  actions: ReactNode;
  children: ReactNode;
}

/** Right-hand panel with a blue header, scrolling body and action footer (Figma "Side Panel"). */
const SidePanel = ({
  open,
  onOpenChange,
  title,
  description,
  actions,
  children
}: SidePanelProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="right"
      showCloseButton={false}
      overlayClassName="bg-black/20"
      className="gap-0 overflow-hidden rounded-3xl border-0 p-0 data-[side=right]:inset-y-2 data-[side=right]:right-2 data-[side=right]:h-[calc(100%-1rem)] data-[side=right]:w-125 data-[side=right]:border-l-0 data-[side=right]:sm:max-w-125"
    >
      <div className="flex h-15.5 shrink-0 items-center justify-between bg-primary-100 py-3 pr-4 pl-6">
        <SheetTitle className="text-lg font-normal text-white">
          {title}
        </SheetTitle>
        <SheetClose asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Close"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <XMarkIcon className="size-6" />
          </Button>
        </SheetClose>
      </div>
      <SheetDescription className="sr-only">{description}</SheetDescription>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {children}
      </div>
      <div className="flex shrink-0 justify-end gap-2 p-6 inside-border-top">
        {actions}
      </div>
    </SheetContent>
  </Sheet>
);

export default SidePanel;
