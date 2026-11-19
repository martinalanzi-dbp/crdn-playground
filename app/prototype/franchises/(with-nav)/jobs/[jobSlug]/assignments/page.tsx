import { SectionCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import AssignmentsTable from "../../../../_components/AssignmentsTable/AssignmentsTable";
import JobHeader from "../../../../_components/JobHeader/JobHeader";
import { job } from "../../../../_data/assignments";

const AssignmentsPage = () => (
  <>
    <JobHeader
      name={job.name}
      claimNumber={job.claimNumber}
      lossReportedDate={job.lossReportedDate}
      status={job.status}
      activeTab="Assignments"
    />
    <div className="p-4">
      <SectionCard title="Assignments" actions={<Button>Add Assignment</Button>}>
        <AssignmentsTable />
      </SectionCard>
    </div>
  </>
);

export default AssignmentsPage;
