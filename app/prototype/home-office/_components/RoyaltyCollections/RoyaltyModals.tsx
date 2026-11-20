"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ExclamationTriangleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";
import {
  HOLD_DAYS,
  RoyaltyEstimate,
  addDays,
  daysLeft,
  formatDate,
  formatMoney,
  unpaid
} from "../../_data/royalty-collections";

const REASON_MAX = 400;

const SummaryField = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex w-40 flex-col gap-1">
    <p className="text-sm text-neutral-900">{label}</p>
    <div className="flex flex-col gap-0.5 text-base text-neutral-500">{children}</div>
  </div>
);

/**
 * Gray card repeating the estimate the action applies to (Figma modal "Card").
 * `extra` adds a second block below a divider: hold dates or the franchise's reason.
 */
const EstimateSummary = ({
  item,
  extra
}: {
  item: RoyaltyEstimate;
  extra?: ReactNode;
}) => (
  <div className="flex flex-col gap-4 rounded-sm bg-neutral-50 p-4 inset-ring-1 inset-ring-border">
    <div className="flex justify-between">
      <SummaryField label="Job">
        <p>{item.jobName}</p>
        <p>{item.jobNumber}</p>
      </SummaryField>
      <SummaryField label="Franchise/Owner">
        <p>{item.franchise}</p>
        <p>{item.franchiseOwner}</p>
      </SummaryField>
      <SummaryField label="Unpaid">
        <p>{formatMoney(unpaid(item))}</p>
      </SummaryField>
    </div>
    {extra && (
      <>
        <hr className="border-border" />
        {extra}
      </>
    )}
  </div>
);

const HoldDates = ({ item }: { item: RoyaltyEstimate }) => (
  <div className="flex justify-between">
    <SummaryField label="Hold Started">
      <p>{item.holdStarted ? formatDate(item.holdStarted) : "-"}</p>
    </SummaryField>
    <SummaryField label="Hold Expires">
      <p>{item.holdExpires ? formatDate(item.holdExpires) : "-"}</p>
    </SummaryField>
    <SummaryField label="Days Remaining">
      <p>{item.holdExpires ? `${daysLeft(item.holdExpires)} days left` : "-"}</p>
    </SummaryField>
  </div>
);

const FranchiseReason = ({ item }: { item: RoyaltyEstimate }) => (
  <div className="flex flex-col gap-1">
    <p className="text-sm text-neutral-900">Franchise&apos;s reason</p>
    <p className="text-base text-neutral-500">{item.reason}</p>
  </div>
);

const HoldDuration = () => (
  <div className="flex flex-col gap-1">
    <p className="text-sm text-neutral-900">Hold Duration</p>
    <p className="text-base text-neutral-500">{HOLD_DAYS} Days</p>
  </div>
);

const WarningAlert = ({ title, note }: { title: string; note?: string }) => (
  <div className="flex gap-3 rounded-sm bg-warning-50 p-5 shadow-lg inset-ring-1 inset-ring-alpha-dark-50">
    <ExclamationTriangleIcon className="size-6 shrink-0 text-warning-200" />
    <div className="flex flex-col gap-1.5">
      <p className="text-lg text-warning-200">{title}</p>
      {note && <p className="text-base text-neutral-600">{note}</p>}
    </div>
  </div>
);

/** Shared frame for every royalty modal: header, scrolling content, Cancel / confirm footer. */
const ModalFrame = ({
  title,
  onClose,
  confirmLabel,
  canConfirm = true,
  onConfirm,
  children
}: {
  title: string;
  onClose: () => void;
  confirmLabel: string;
  canConfirm?: boolean;
  onConfirm: () => void;
  children: ReactNode;
}) => (
  <Dialog open onOpenChange={(open) => !open && onClose()}>
    <DialogContent
      showCloseButton={false}
      overlayClassName="bg-black/20"
      className="max-h-[calc(100%-2rem)] w-162.5 gap-0 overflow-hidden rounded-lg border border-neutral-100 p-0 sm:max-w-162.5"
    >
      <div className="flex h-15.5 shrink-0 items-center justify-between py-3 pr-4 pl-6 inside-border-b">
        <DialogTitle className="text-lg font-normal text-neutral-800">
          {title}
        </DialogTitle>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Close"
          onClick={onClose}
        >
          <XMarkIcon className="size-6" />
        </Button>
      </div>
      <DialogDescription className="sr-only">{title}</DialogDescription>
      <div className="flex flex-col gap-4 overflow-y-auto p-6">{children}</div>
      <div className="flex justify-end gap-2 px-6 pt-3 pb-6">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!canConfirm} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

const Intro = ({ children }: { children: ReactNode }) => (
  <p className="text-lg text-neutral-700">{children}</p>
);

const ReasonField = ({
  label,
  value,
  onChange,
  required,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) => (
  <div className="flex flex-col gap-1">
    <Label htmlFor="royalty-reason" className="gap-1 text-sm font-normal">
      {required && <span className="text-error-100">*</span>}
      {label}
    </Label>
    <div className="relative">
      <Textarea
        id="royalty-reason"
        value={value}
        maxLength={REASON_MAX}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-36 pb-8"
      />
      <p className="pointer-events-none absolute right-3 bottom-2 left-3 border-t border-neutral-100 pt-1 text-right text-xs text-neutral-400">
        {String(value.length).padStart(3, "0")}/{REASON_MAX}
      </p>
    </div>
  </div>
);

export type RoyaltyAction =
  | "approve"
  | "hold"
  | "writeoff"
  | "undo"
  | "extendHold"
  | "approveHold"
  | "denyHold"
  | "approveWriteoff"
  | "denyWriteoff";

interface ActionCopy {
  title: string;
  intro: string;
  confirm: string;
  /** Reason field. Omitted when the dialog has none (Approve Hold Request). */
  reason?: { label?: string; required?: boolean; placeholder?: string; initial?: string };
  /** Shows the franchise's request reason, read-only, inside the summary card. */
  franchiseReason?: boolean;
  alert?: { title: string; note?: string };
}

/* Dev note: the hold reason is pre-filled, required, and can be edited before confirming. */
const defaultHoldReason = "30-day hold requested and approved.";

const actionCopy: Record<RoyaltyAction, ActionCopy> = {
  approve: {
    title: "Approve for collections",
    intro: "This estimate will be included in the next royalty batch.",
    confirm: "Confirm",
    reason: {},
    alert: {
      title:
        "Royalties will be collected on the unpaid amount of this estimate when the next batch runs.",
      note: "This action cannot be undone once the batch has been posted."
    }
  },
  hold: {
    title: "Place on Hold",
    intro: "This estimate will be paused and removed from the collections queue.",
    confirm: "Confirm",
    reason: { required: true, initial: defaultHoldReason },
    alert: {
      title:
        "After the hold period ends, this estimate will automatically return to the collections queue if it still has an unpaid amount."
    }
  },
  writeoff: {
    title: "Write off estimate",
    intro:
      "No additional royalties will be collected on this Estimate, and the Estimate will be closed.",
    confirm: "Write-off",
    reason: {
      required: true,
      placeholder: "Explain why this estimate is being written off."
    }
  },
  undo: {
    title: "Undo collection approval",
    intro:
      "This estimate will be removed from the next royalty batch and returned to the Pending review queue.",
    confirm: "Undo approval",
    reason: {}
  },
  extendHold: {
    title: "Extend Hold",
    intro: "This will extend the hold period for this estimate.",
    confirm: "Confirm",
    reason: {},
    alert: {
      title:
        "After the hold period ends, this estimate will return to the collections queue if it still has an unpaid amount."
    }
  },
  approveHold: {
    title: "Approve Hold Request",
    intro: "Are you sure you want to approve this hold request?",
    confirm: "Approve Hold",
    franchiseReason: true,
    alert: {
      title:
        'If approved, this estimate will be placed on a 30-day hold and will appear in the "Active holds" table.',
      note: "It will not enter Collections until the hold expires."
    }
  },
  denyHold: {
    title: "Deny Hold Request",
    intro: "Are you sure you want to deny this hold request?",
    confirm: "Deny Hold",
    franchiseReason: true,
    reason: {
      label: "Reason for denial",
      required: true,
      placeholder: "Explain why this hold request is being denied."
    },
    alert: {
      title:
        'If denied, this estimate stays in the "Collection Review" and remains eligible for collections.',
      note: "The franchisee will be notified of the denial and the reason provided."
    }
  },
  approveWriteoff: {
    title: "Approve Write-off",
    intro:
      "No additional royalties will be collected on this Estimate, and the Estimate will be closed.",
    confirm: "Approve Write-off",
    franchiseReason: true,
    reason: {},
    alert: {
      title: "HO accepts the franchisee's reason.",
      note: "It will not enter the royalty batch, and any royalties already collected on it will not be refunded."
    }
  },
  denyWriteoff: {
    title: "Deny Write-off",
    intro:
      "This estimate will return to its normal course. Standard royalty and collection rules — including eligibility for holds — will continue to apply.",
    confirm: "Deny Write-off",
    franchiseReason: true,
    reason: {
      label: "Reason for denial",
      required: true,
      placeholder: "Explain why this write-off request is being denied."
    },
    alert: {
      title: "HO does not accept the franchisee's reason.",
      note: "This estimate will return to its normal course, and the franchisee will be notified of this decision along with the reason provided above."
    }
  }
};

interface ActionModalProps {
  action: RoyaltyAction;
  item: RoyaltyEstimate;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

/** Confirmation dialog for every single-estimate action on the Royalty Collections page. */
export const ActionModal = ({
  action,
  item,
  onClose,
  onConfirm
}: ActionModalProps) => {
  const copy = actionCopy[action];
  const [reason, setReason] = useState(copy.reason?.initial ?? "");
  const canConfirm = !copy.reason?.required || reason.trim().length > 0;

  return (
    <ModalFrame
      title={copy.title}
      onClose={onClose}
      confirmLabel={copy.confirm}
      canConfirm={canConfirm}
      onConfirm={() => onConfirm(reason.trim())}
    >
      <Intro>{copy.intro}</Intro>
      <EstimateSummary
        item={item}
        extra={
          action === "extendHold" ? (
            <HoldDates item={item} />
          ) : copy.franchiseReason ? (
            <FranchiseReason item={item} />
          ) : undefined
        }
      />
      {(action === "hold" || action === "extendHold") && <HoldDuration />}
      {action === "extendHold" && item.holdExpires && (
        <div className="flex items-center justify-between rounded-sm bg-success-50 px-4 py-3 text-base text-success-200 inset-ring-1 inset-ring-alpha-dark-50">
          <p>New expiration date</p>
          <p>{formatDate(addDays(item.holdExpires, HOLD_DAYS))}</p>
        </div>
      )}
      {copy.reason && (
        <ReasonField
          label={copy.reason.label ?? "Reason"}
          value={reason}
          onChange={setReason}
          required={copy.reason.required}
          placeholder={copy.reason.placeholder}
        />
      )}
      {copy.alert && <WarningAlert {...copy.alert} />}
    </ModalFrame>
  );
};

interface BulkApproveModalProps {
  items: RoyaltyEstimate[];
  onClose: () => void;
  onConfirm: () => void;
}

/** Approve several estimates at once. Dev note: at most 5 rows show; the table scrolls beyond that. */
export const BulkApproveModal = ({
  items,
  onClose,
  onConfirm
}: BulkApproveModalProps) => {
  const total = items.reduce((sum, item) => sum + unpaid(item), 0);

  return (
    <ModalFrame
      title="Approve for collections"
      onClose={onClose}
      confirmLabel="Confirm"
      onConfirm={onConfirm}
    >
      <Intro>
        {items.length} {items.length === 1 ? "estimate" : "estimates"} will be
        included in the next royalty batch.
      </Intro>
      <div className="rounded-sm bg-neutral-50 inset-ring-1 inset-ring-border">
        <div className="grid grid-cols-[1fr_1fr_8rem] gap-4 px-4 py-3 text-sm text-neutral-900 inside-border-b">
          <p>Jobs Selected</p>
          <p>Franchise/Owner</p>
          <p className="text-right">Unpaid</p>
        </div>
        <div className="max-h-86 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_1fr_8rem] gap-4 px-4 py-3 text-base text-neutral-500 inside-border-b"
            >
              <div>
                <p>{item.jobName}</p>
                <p>{item.jobNumber}</p>
              </div>
              <div>
                <p>{item.franchise}</p>
                <p>{item.franchiseOwner}</p>
              </div>
              <p className="text-right">{formatMoney(unpaid(item))}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between px-4 py-3 text-base text-neutral-900">
          <p>Total Unpaid</p>
          <p>{formatMoney(total)}</p>
        </div>
      </div>
      <WarningAlert
        title="Royalties will be collected on the unpaid amount of the selected estimates when the next batch runs."
        note="This action cannot be undone once the batch has been posted."
      />
    </ModalFrame>
  );
};
