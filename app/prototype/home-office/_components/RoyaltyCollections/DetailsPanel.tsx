"use client";

import { SidePanel } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import {
  InternalNote,
  RoyaltyEstimate,
  formatDate,
  formatMoney,
  reached270Date,
  unpaid
} from "../../_data/royalty-collections";

const NOTES_COLLAPSED = 3;

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="text-sm tracking-widest text-neutral-500 uppercase">
    {children}
  </p>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <p className="text-sm text-neutral-900">{label}</p>
    <p className="text-base text-neutral-500">{value}</p>
  </div>
);

const AmountRow = ({
  label,
  value,
  large
}: {
  label: string;
  value: string;
  large?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <p className="text-sm text-neutral-900">{label}</p>
    <p className={large ? "text-lg text-neutral-900" : "text-base text-neutral-900"}>
      {value}
    </p>
  </div>
);

const Divider = () => <hr className="border-border" />;

interface DetailsPanelProps {
  item: RoyaltyEstimate;
  /** Internal notes, newest first. They are the same notes as Franchise > Communications. */
  notes: InternalNote[];
  onClose: () => void;
  onApprove: () => void;
  onMoveToLegal: () => void;
}

/** "Details" side panel opened from a row's actions menu. */
const DetailsPanel = ({
  item,
  notes,
  onClose,
  onApprove,
  onMoveToLegal
}: DetailsPanelProps) => {
  const [showAllNotes, setShowAllNotes] = useState(false);
  const reached = reached270Date(item);
  /* Dev note: show the 3 most recent notes, with a "View all" link when there are more. */
  const visibleNotes = showAllNotes ? notes : notes.slice(0, NOTES_COLLAPSED);

  return (
    <SidePanel
      open
      onOpenChange={(open) => !open && onClose()}
      title="Details"
      description="Job, balance, payment history and internal notes for this estimate."
      actions={
        <div className="flex w-full gap-2">
          <Button variant="secondary" className="flex-1" onClick={onMoveToLegal}>
            Move to legal
          </Button>
          <Button className="flex-1" onClick={onApprove}>
            Approve
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 rounded-sm bg-neutral-50 p-4 inset-ring-1 inset-ring-border">
        <SectionLabel>Job details</SectionLabel>
        <Field label="Job" value={`${item.jobName}  ·  ${item.jobNumber}`} />
        <Field label="Invoice/Estimate" value={`${item.estimate}  ·  #0000001024`} />
        <Field label="Franchise" value={item.franchise} />
        <Field label="Territory" value={item.territory} />
        <Field
          label="First Invoice Date"
          value={item.firstInvoice ? formatDate(item.firstInvoice) : "-"}
        />
        <Field
          label="Reached 270 days"
          value={reached ? formatDate(reached) : "-"}
        />

        <Divider />
        <SectionLabel>Balance due</SectionLabel>
        <AmountRow label="Outstanding balance" value={formatMoney(unpaid(item))} large />
        <div className="flex flex-col gap-1">
          <AmountRow label="Total Job Value" value={formatMoney(item.total)} />
          <AmountRow label="Total Collected" value={formatMoney(item.paid)} />
        </div>

        {item.paid > 0 && item.firstInvoice && (
          <>
            <Divider />
            <SectionLabel>Payment history</SectionLabel>
            <AmountRow
              label={formatDate(item.firstInvoice)}
              value={formatMoney(item.paid)}
            />
          </>
        )}

        <Divider />
        <SectionLabel>Internal notes</SectionLabel>
        {visibleNotes.map((note) => (
          <div key={`${note.date}-${note.text}`} className="flex flex-col gap-1">
            <p className="flex gap-2 text-base text-neutral-500">
              <span>{formatDate(note.date)}</span>
              <span>·</span>
              <span>{note.author}</span>
            </p>
            <p className="text-base text-neutral-900">{note.text}</p>
          </div>
        ))}
        {notes.length > NOTES_COLLAPSED && (
          <button
            type="button"
            onClick={() => setShowAllNotes((current) => !current)}
            className="self-start text-sm text-link underline"
          >
            {showAllNotes
              ? "Show less"
              : `View all internal notes (${notes.length})`}
          </button>
        )}
      </div>
    </SidePanel>
  );
};

export default DetailsPanel;
