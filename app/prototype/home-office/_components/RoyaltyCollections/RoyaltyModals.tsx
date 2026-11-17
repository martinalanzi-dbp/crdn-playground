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
  RoyaltyEstimate,
  formatMoney,
  unpaid
} from "../../_data/royalty-collections";

const REASON_MAX = 400;

/** Gray card repeating the estimate the action applies to (Figma modal "Card"). */
const EstimateSummary = ({ item }: { item: RoyaltyEstimate }) => (
  <div className="flex justify-between rounded-sm bg-neutral-50 p-4 inset-ring-1 inset-ring-border">
    <div className="flex w-40 flex-col gap-1">
      <p className="text-sm text-neutral-900">Job</p>
      <div className="flex flex-col gap-0.5 text-base text-neutral-500">
        <p>{item.jobName}</p>
        <p>{item.jobNumber}</p>
      </div>
    </div>
    <div className="flex w-40 flex-col gap-1">
      <p className="text-sm text-neutral-900">Franchise/Owner</p>
      <div className="flex flex-col gap-0.5 text-base text-neutral-500">
        <p>{item.franchise}</p>
        <p>{item.franchiseOwner}</p>
      </div>
    </div>
    <div className="flex w-40 flex-col gap-1">
      <p className="text-sm text-neutral-900">Unpaid</p>
      <p className="text-base text-neutral-500">{formatMoney(unpaid(item))}</p>
    </div>
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
  value,
  onChange,
  required,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) => (
  <div className="flex flex-col gap-1">
    <Label htmlFor="royalty-reason" className="gap-1 text-sm font-normal">
      {required && <span className="text-error-100">*</span>}
      Reason
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

export type RoyaltyAction = "approve" | "hold" | "writeoff" | "undo";

interface ActionModalProps {
  action: RoyaltyAction;
  item: RoyaltyEstimate;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

/* Dev note: the hold reason is pre-filled, required, and can be edited before confirming. */
const defaultHoldReason = "30-day hold requested and approved.";

/** Approve, Place on Hold, Write-off estimate and Undo approval for one estimate. */
export const ActionModal = ({
  action,
  item,
  onClose,
  onConfirm
}: ActionModalProps) => {
  const [reason, setReason] = useState(action === "hold" ? defaultHoldReason : "");
  const requiresReason = action === "hold" || action === "writeoff";
  const canConfirm = !requiresReason || reason.trim().length > 0;

  const copy = {
    approve: {
      title: "Approve for collections",
      intro: "This estimate will be included in the next royalty batch.",
      confirm: "Confirm"
    },
    hold: {
      title: "Place on Hold",
      intro: "This estimate will be paused and removed from the collections queue.",
      confirm: "Confirm"
    },
    writeoff: {
      title: "Write off estimate",
      intro:
        "No additional royalties will be collected on this Estimate, and the Estimate will be closed.",
      confirm: "Write-off"
    },
    undo: {
      title: "Undo collection approval",
      intro:
        "This estimate will be removed from the next royalty batch and returned to the Pending review queue.",
      confirm: "Undo approval"
    }
  }[action];

  return (
    <ModalFrame
      title={copy.title}
      onClose={onClose}
      confirmLabel={copy.confirm}
      canConfirm={canConfirm}
      onConfirm={() => onConfirm(reason.trim())}
    >
      <Intro>{copy.intro}</Intro>
      <EstimateSummary item={item} />
      {action === "hold" && (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-neutral-900">Hold Duration</p>
          <p className="text-base text-neutral-500">30 Days</p>
        </div>
      )}
      <ReasonField
        value={reason}
        onChange={setReason}
        required={requiresReason}
        placeholder={
          action === "writeoff"
            ? "Explain why this estimate is being written off."
            : undefined
        }
      />
      {action === "approve" && (
        <WarningAlert
          title="Royalties will be collected on the unpaid amount of this estimate when the next batch runs."
          note="This action cannot be undone once the batch has been posted."
        />
      )}
      {action === "hold" && (
        <WarningAlert title="After the hold period ends, this estimate will automatically return to the collections queue if it still has an unpaid amount." />
      )}
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
