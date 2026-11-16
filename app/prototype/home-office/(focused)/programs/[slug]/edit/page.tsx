"use client";

import { notFound, useParams } from "next/navigation";
import ProgramForm from "../../../../_components/ProgramForm/ProgramForm";
import { valuesFromProgram } from "../../../../_data/program-values";
import { programs } from "../../../../_data/programs";

const UpdateProgramPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = programs.find((item) => item.slug === slug);
  if (!program) notFound();

  return (
    <ProgramForm
      mode="update"
      program={program}
      values={valuesFromProgram(program)}
    />
  );
};

export default UpdateProgramPage;
