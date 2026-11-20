"use client";

import { StatusDropdown, StatusPillType } from "@/components/shared";
import { cn } from "@/lib/utils";
import { CalendarIcon, HashtagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

const tabs = [
  "Details",
  "Assignments",
  "Rooms",
  "Items",
  "Reports",
  "Communication",
  "Financial",
  "ON-SITE",
  "Files",
  "Photos"
];

const jobStatuses: StatusPillType[] = ["Active", "Closed", "Canceled"];

interface JobHeaderProps {
  name: string;
  claimNumber: string;
  lossReportedDate: string;
  status: StatusPillType;
  activeTab: string;
}

/** Job title, status and section tabs shown above every job screen (Figma "Job Header"). */
const JobHeader = ({
  name,
  claimNumber,
  lossReportedDate,
  status: initialStatus,
  activeTab
}: JobHeaderProps) => {
  const [status, setStatus] = useState(initialStatus);

  return (
    <header>
      <div className="flex items-center justify-between p-4 full-bleed-bar">
        <div className="flex items-center gap-3 py-1">
          <Image
            src="/assets/images/job-property.jpg"
            alt=""
            width={48}
            height={48}
            className="size-12 rounded-md bg-neutral-700 object-cover"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-display-sm text-neutral-700">{name}</h1>
            <div className="flex gap-4 text-sm text-neutral-400">
              <span className="flex items-center gap-1">
                <HashtagIcon className="size-4" />
                Claim number: {claimNumber}
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                Loss reported date: {lossReportedDate}
              </span>
            </div>
          </div>
        </div>
        <StatusDropdown
          status={status}
          options={jobStatuses.filter((option) => option !== status)}
          onChange={setStatus}
        />
      </div>

      <nav className="flex px-4 pt-2 full-bleed-bar" aria-label="Job sections">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              aria-current={isActive ? "page" : undefined}
              className="flex flex-1 flex-col items-center gap-2 text-sm"
            >
              <span className={isActive ? "text-primary-100" : "text-neutral-500"}>
                {tab}
              </span>
              <span
                className={cn(
                  "w-full",
                  isActive ? "h-0.5 bg-primary-100" : "h-px bg-border"
                )}
              />
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default JobHeader;
