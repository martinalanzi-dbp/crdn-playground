import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

/** White bordered section with a title row (Figma "Section/Base" + "Section/Header"). */
const SectionCard = ({
  title,
  description,
  className,
  children
}: SectionCardProps) => (
  <section className="overflow-hidden rounded-3xl bg-white inset-ring-1 inset-ring-border">
    <header className="p-4 inside-border-b">
      <h2 className="text-xl leading-[29px] text-neutral-700">{title}</h2>
      {description && <p className="text-sm text-neutral-500">{description}</p>}
    </header>
    <div className={cn("p-4", className)}>{children}</div>
  </section>
);

export default SectionCard;
