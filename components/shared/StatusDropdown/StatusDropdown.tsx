"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import StatusPill, {
  StatusPillType,
  statusIcons
} from "../StatusPill/StatusPill";

interface StatusDropdownProps {
  status: StatusPillType;
  /** Statuses the user can move to from the current one. */
  options: StatusPillType[];
  onChange: (status: StatusPillType) => void;
}

/** Status the user can change (Figma "Status Pills"). Use a plain StatusPill when it is read-only. */
const StatusDropdown = ({ status, options, onChange }: StatusDropdownProps) => (
  <DropdownMenu>
    <div className="inline-flex h-11 items-stretch overflow-hidden rounded-md border border-border bg-white">
      <StatusPill status={status} size="md" bare />
      <DropdownMenuTrigger
        aria-label="Change status"
        className="flex w-11 items-center justify-center border-l border-border outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <ChevronDownIcon className="size-4 text-neutral-500" />
      </DropdownMenuTrigger>
    </div>
    <DropdownMenuContent
      align="end"
      className="w-36 border border-border p-1 shadow-md"
    >
      {options.map((option) => {
        const { Icon, className } = statusIcons[option];
        return (
          <DropdownMenuItem
            key={option}
            onSelect={() => onChange(option)}
            className="h-7 gap-2 px-2 text-sm"
          >
            <Icon className={`size-4 ${className}`} />
            {option}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default StatusDropdown;
