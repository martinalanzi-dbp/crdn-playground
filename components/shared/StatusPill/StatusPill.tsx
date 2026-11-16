import {
  CheckCircleIcon,
  EllipsisHorizontalCircleIcon,
  MinusCircleIcon,
  PencilSquareIcon,
  XCircleIcon
} from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import { ComponentType } from "react";

export type StatusPillType =
  | "Draft"
  | "Active"
  | "Inactive"
  | "Canceled"
  | "Closed";

export const statusIcons: Record<
  StatusPillType,
  { Icon: ComponentType<{ className?: string }>; className: string }
> = {
  Draft: { Icon: PencilSquareIcon, className: "text-warning-100" },
  Active: { Icon: EllipsisHorizontalCircleIcon, className: "text-success-100" },
  Inactive: { Icon: MinusCircleIcon, className: "text-error-100" },
  Canceled: { Icon: XCircleIcon, className: "text-error-100" },
  Closed: { Icon: CheckCircleIcon, className: "text-primary-50" }
};

interface StatusPillProps {
  status: StatusPillType;
  size?: "sm" | "md";
  /** Drop the border, for use inside a larger control such as StatusDropdown. */
  bare?: boolean;
}

const StatusPill = ({ status, size = "sm", bare }: StatusPillProps) => {
  const { Icon, className } = statusIcons[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 bg-white px-4 text-base tracking-button text-neutral-900",
        size === "md" ? "h-11 text-lg" : "h-9",
        !bare && "rounded-md border border-border"
      )}
    >
      <Icon className={`size-4 ${className}`} />
      {status}
    </span>
  );
};

export default StatusPill;
