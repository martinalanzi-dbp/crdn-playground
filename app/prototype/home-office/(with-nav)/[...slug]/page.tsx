import { PageHeader } from "@/components/shared";

interface PlaceholderPageProps {
  params: Promise<{ slug: string[] }>;
}

/* Fallback for nav destinations that do not have a screen yet. */
const PlaceholderPage = async ({ params }: PlaceholderPageProps) => {
  const { slug } = await params;
  const title = slug[slug.length - 1]
    .split("-")
    .map((word, index) =>
      index === 0 ? word[0].toUpperCase() + word.slice(1) : word
    )
    .join(" ");

  return (
    <>
      <PageHeader title={title} />
      <div className="p-4">
        <div className="rounded-md border border-border bg-card p-6 text-sm text-neutral-500">
          This screen has not been designed yet.
        </div>
      </div>
    </>
  );
};

export default PlaceholderPage;
