"use client";

import { StatusPill } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { EllipsisVerticalIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  Assignment,
  AssignmentLink,
  TipStatus,
  assignments as initialAssignments
} from "../../_data/assignments";

const headings = [
  "Name",
  "Type",
  "ID",
  "Status",
  "Next TIP",
  "TIP Status",
  "Assignment Received",
  "Restorable Item Count"
];

const tipStatusBadges: Record<TipStatus, { label: string; className: string }> =
  {
    "due-later": {
      label: "Due in more than 24 hours",
      className: "bg-success-50 text-success-200"
    },
    "due-soon": {
      label: "Due within 4 and 24 hours",
      className: "bg-warning-50 text-warning-200"
    }
  };

const linkTooltips: Record<AssignmentLink, string> = {
  XactAnalysis: "Linked to an XactAnalysis assignment",
  "Cotality Workspace": "Linked to a Cotality Workspace assignment"
};

const AssignmentsTable = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);

  const unlink = (slug: string) =>
    setAssignments((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, link: undefined } : item
      )
    );

  return (
    <div className="inside-border w-full overflow-hidden rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-neutral-50">
            {headings.map((heading) => (
              <TableHead
                key={heading}
                className="h-11.25 px-2 py-0 text-neutral-600"
              >
                {heading}
              </TableHead>
            ))}
            <TableHead className="w-10 px-2 py-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((item) => {
            const tipBadge = tipStatusBadges[item.tipStatus];
            return (
              <TableRow key={item.slug}>
                <TableCell className="h-16 px-2 py-0 text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    {item.name}
                    {item.link && (
                      <Tooltip>
                        <TooltipTrigger
                          aria-label={linkTooltips[item.link]}
                          className="text-neutral-400 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        >
                          <LinkIcon className="size-3" />
                        </TooltipTrigger>
                        <TooltipContent>{linkTooltips[item.link]}</TooltipContent>
                      </Tooltip>
                    )}
                  </span>
                </TableCell>
                <TableCell className="h-16 px-2 py-0 text-neutral-600">
                  {item.type}
                </TableCell>
                <TableCell className="h-16 px-2 py-0 text-neutral-600">
                  {item.carrierId ?? item.internalId}
                </TableCell>
                <TableCell className="h-16 px-2 py-0">
                  <StatusPill status={item.status} />
                </TableCell>
                <TableCell className="h-16 px-2 py-0 text-neutral-600">
                  {item.nextTip}
                </TableCell>
                <TableCell className="h-16 px-2 py-0">
                  <Badge
                    className={`h-6 px-2 py-1 font-normal ${tipBadge.className}`}
                  >
                    {tipBadge.label}
                  </Badge>
                </TableCell>
                <TableCell className="h-16 px-2 py-0 text-base text-neutral-500">
                  {item.received}
                </TableCell>
                <TableCell className="h-16 px-2 py-0 text-neutral-600">
                  {item.restorableItems.restored} / {item.restorableItems.total}
                </TableCell>
                <TableCell className="h-16 px-2 py-0">
                  {item.link && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Actions for ${item.name}`}
                        >
                          <EllipsisVerticalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>Open in {item.link}</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => unlink(item.slug)}>
                          Unlink assignment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssignmentsTable;
