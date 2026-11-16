import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  /** 1-based current page. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const itemClasses =
  "flex h-10 items-center justify-center border-[0.5px] border-neutral-200 bg-white text-sm text-neutral-600 outline-none transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:text-neutral-400 disabled:hover:bg-white";

const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => (
  <nav aria-label="Pagination" className="flex items-center">
    <button
      type="button"
      disabled={page === 1}
      onClick={() => onPageChange(page - 1)}
      className={cn(itemClasses, "gap-2 rounded-l-md py-3 pr-4 pl-3")}
    >
      <ArrowLeftIcon className="size-4" />
      Previous
    </button>
    {Array.from({ length: pageCount }, (_, index) => index + 1).map(
      (number) => (
        <button
          key={number}
          type="button"
          aria-current={number === page ? "page" : undefined}
          onClick={() => onPageChange(number)}
          className={cn(
            itemClasses,
            "size-10",
            number === page &&
              "border-primary-200 bg-primary-100 text-white hover:bg-primary-100"
          )}
        >
          {number}
        </button>
      )
    )}
    <button
      type="button"
      disabled={page === pageCount}
      onClick={() => onPageChange(page + 1)}
      className={cn(itemClasses, "gap-2 rounded-r-md py-3 pr-3 pl-4")}
    >
      Next
      <ArrowRightIcon className="size-4" />
    </button>
  </nav>
);

export default Pagination;
