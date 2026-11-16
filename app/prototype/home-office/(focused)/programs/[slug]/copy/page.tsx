"use client";

import { notFound, useParams } from "next/navigation";
import ProgramForm from "../../../../_components/ProgramForm/ProgramForm";
import { valuesFromProgram } from "../../../../_data/program-values";
import { programs } from "../../../../_data/programs";

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric"
}).format(new Date());

const CopyProgramPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = programs.find((item) => item.slug === slug);
  if (!program) notFound();

  const values = valuesFromProgram(program);
  // Dev notes: pre-populate everything except the dates, and add month and year to the name
  // so the unique program name does not clash with the original.
  const copyValues = {
    ...values,
    name: `${values.name} - ${monthYear}`,
    startDate: "",
    endDate: ""
  };

  return <ProgramForm mode="copy" program={program} values={copyValues} />;
};

export default CopyProgramPage;
