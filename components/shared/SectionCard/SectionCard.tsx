import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  /** Right-aligned header actions, such as one Primary button. */
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** White bordered section with a title row (Figma "Section/Base" + "Section/Header"). */
const SectionCard = ({
  title,
  description,
  actions,
  className,
  children
}: SectionCardProps) => (
  <section className="overflow-hidden rounded-3xl bg-white inset-ring-1 inset-ring-border">
    <header className="flex items-center justify-between p-4 inside-border-b">
      <div>
        <h2 className="text-xl leading-[29px] text-neutral-700">{title}</h2>
        {description && (
          <p className="text-sm text-neutral-500">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
    <div className={cn("p-4", className)}>{children}</div>
  </section>
);

export default SectionCard;
