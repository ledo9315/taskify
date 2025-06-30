"use client";

import { useTaskQuery } from "@/src/hooks/server-actions/useTaskQuery";
import { TaskEditor } from "@/src/components/task/TaskEditor";
import { Navigation } from "@/src/components/common/Navigation";
import { FormContainer } from "@/src/components/common/FormContainer";
import { use } from "react";

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const taskQuery = useTaskQuery(Number(id));

  return (
    <>
      <Navigation className="mb-20" />
      <FormContainer size="xl">
        <TaskEditor taskQuery={taskQuery} />
      </FormContainer>
    </>
  );
}
