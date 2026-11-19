"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
const sameDay = (a: Date, b: Date) => a.getTime() === b.getTime();

export interface DateRange {
  from: Date;
  to: Date;
}

interface MonthProps {
  year: number;
  month: number;
  from: Date | null;
  to: Date | null;
  onPick: (date: Date) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/* Six rows of seven days, so both months have the same height. */
const Month = ({ year, month, from, to, onPick, onPrev, onNext }: MonthProps) => {
  const first = new Date(year, month, 1);
  const cells = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(year, month, 1 - first.getDay() + index);
    return { date, outside: date.getMonth() !== month };
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-9 items-center justify-between rounded-sm border border-border px-1 text-sm text-neutral-700">
        {onPrev ? (
          <Button variant="ghost" size="icon-sm" aria-label="Previous month" onClick={onPrev}>
            <ChevronLeftIcon />
          </Button>
        ) : (
          <span className="size-9" />
        )}
        <span className="flex gap-6">
          <span>{monthNames[month]}</span>
          <span>{year}</span>
        </span>
        {onNext ? (
          <Button variant="ghost" size="icon-sm" aria-label="Next month" onClick={onNext}>
            <ChevronRightIcon />
          </Button>
        ) : (
          <span className="size-9" />
        )}
      </div>
      <div className="grid grid-cols-7 border-b border-border pb-1 text-center text-xs text-neutral-700">
        {weekdays.map((day) => (
          <span key={day} className="py-1">{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-sm">
        {cells.map(({ date, outside }) => {
          const isEnd = (from && sameDay(date, from)) || (to && sameDay(date, to));
          const inRange = from && to && date >= from && date <= to;
          return (
            <button
              key={date.getTime()}
              type="button"
              onClick={() => onPick(date)}
              className={cn(
                "h-8 text-center outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                outside ? "text-neutral-300" : "text-neutral-700",
                inRange && "bg-primary-25 text-primary-100",
                isEnd && "rounded-sm bg-primary-100 text-white"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface DateRangeCalendarProps {
  value: DateRange | null;
  onApply: (range: DateRange) => void;
  onCancel: () => void;
}

/** Two-month range picker (Figma "Date Picker"): pick a start, then an end date. */
const DateRangeCalendar = ({ value, onApply, onCancel }: DateRangeCalendarProps) => {
  const today = startOfDay(new Date());
  const [anchor, setAnchor] = useState(
    new Date((value?.from ?? today).getFullYear(), (value?.from ?? today).getMonth(), 1)
  );
  const [from, setFrom] = useState<Date | null>(value?.from ?? null);
  const [to, setTo] = useState<Date | null>(value?.to ?? null);

  const pick = (date: Date) => {
    if (!from || to) {
      setFrom(date);
      setTo(null);
    } else if (date < from) {
      setFrom(date);
    } else {
      setTo(date);
    }
  };

  const shift = (months: number) =>
    setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + months, 1));
  const next = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1);

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex gap-4">
        <Month year={anchor.getFullYear()} month={anchor.getMonth()} from={from} to={to} onPick={pick} onPrev={() => shift(-1)} />
        <Month year={next.getFullYear()} month={next.getMonth()} from={from} to={to} onPick={pick} onNext={() => shift(1)} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button disabled={!from || !to} onClick={() => from && to && onApply({ from, to })}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default DateRangeCalendar;
