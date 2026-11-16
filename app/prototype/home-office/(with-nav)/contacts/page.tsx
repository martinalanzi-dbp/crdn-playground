"use client";

import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useState } from "react";

/* Provisional columns and data until the Contacts frame is available in Figma. */
const contacts = [
  {
    name: "Dana Whitfield",
    company: "Summit Restoration",
    role: "Franchise owner",
    email: "dana.whitfield@summitrestoration.com",
    phone: "+1 (512) 555-0142"
  },
  {
    name: "Marcus Ortiz",
    company: "Lone Star Textile Care",
    role: "General manager",
    email: "m.ortiz@lonestartextile.com",
    phone: "+1 (214) 555-0178"
  },
  {
    name: "Priya Raman",
    company: "Cascade Claims Group",
    role: "Adjuster",
    email: "priya.raman@cascadeclaims.com",
    phone: "+1 (206) 555-0119"
  },
  {
    name: "Tom Aldridge",
    company: "Harbor Mutual",
    role: "Claims manager",
    email: "taldridge@harbormutual.com",
    phone: "+1 (617) 555-0163"
  },
  {
    name: "Elena Vasquez",
    company: "Summit Restoration",
    role: "Warehouse lead",
    email: "elena.vasquez@summitrestoration.com",
    phone: "+1 (512) 555-0187"
  }
];

const ContactsPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Contacts"
        actions={
          <Button onClick={() => setIsCreateOpen(true)}>Add contact</Button>
        }
      />

      <div className="p-4">
        <div className="inside-border overflow-hidden rounded-md bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.email}>
                  <TableCell className="text-link">{contact.name}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.role}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-display-xs font-medium text-neutral-800">
              Add contact
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" />
            </div>
            <div className="col-span-2 flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactsPage;
