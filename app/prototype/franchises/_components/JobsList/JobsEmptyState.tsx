import { Button } from "@/components/ui/button";
import Image from "next/image";

interface JobsEmptyStateProps {
  title: string;
  description: string;
  /** Label of the optional call to action. */
  actionLabel?: string;
  onAction?: () => void;
}

/** Illustration, message and optional action (Figma "Empty state"). */
const JobsEmptyState = ({
  title,
  description,
  actionLabel,
  onAction
}: JobsEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-8 px-12 py-16 text-center">
    {/* Figma draws the page with shapes; the doodles, cloud and background are exported SVGs. */}
    <div className="relative size-47 overflow-hidden">
      <Image
        src="/assets/images/empty-jobs-background.svg"
        alt=""
        width={150}
        height={150}
        className="absolute top-1/2 left-1/2 size-37.5 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="absolute top-[calc(50%-5.6px)] left-1/2 flex h-24 w-19.5 -translate-x-1/2 -translate-y-1/2 flex-col gap-2.5 rounded-xl bg-linear-to-b from-white to-neutral-50 p-4 shadow-md">
        {["w-1/2", "w-full", "w-full", "w-full", "w-full"].map((width, index) => (
          <span key={index} className={`h-1.5 rounded-full bg-neutral-200 ${width}`} />
        ))}
      </div>
      <Image
        src="/assets/images/empty-jobs-cloud.svg"
        alt=""
        width={60}
        height={42}
        className="absolute top-[calc(50%+31px)] left-[calc(50%+16px)] h-10.5 w-15"
      />
      <Image
        src="/assets/images/empty-jobs-doodles.svg"
        alt=""
        width={178}
        height={112}
        className="absolute top-1/2 left-1/2 h-28 w-44.5 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-neutral-500">
        <h2 className="text-display-sm">{title}</h2>
        <p className="text-base">{description}</p>
      </div>
      {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  </div>
);

export default JobsEmptyState;
