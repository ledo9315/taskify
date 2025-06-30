import { TaskInputForm } from "@/src/components/form/TaskForm";
import { Navigation } from "@/src/components/common/Navigation";
import { FormContainer } from "@/src/components/common/FormContainer";

export default function AddTaskPage() {
  return (
    <>
      <Navigation className="mb-20" />
      <FormContainer size="xl">
        <TaskInputForm />
      </FormContainer>
    </>
  );
}
