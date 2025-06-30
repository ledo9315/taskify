"use client";

import { LoadingScreen } from "@/src/components/common/LoadingScreen";
import { useTaskQuery } from "@/src/hooks/server-actions/useTaskQuery";
import { TaskItemActions } from "@/src/components/task/TaskItemActions";
import { TaskItemDescription } from "@/src/components/task/TaskItemDescription";
import { TaskItemTags } from "@/src/components/task/TaskItemTags";
import { ArrowLeft, Calendar, Tag, FileText } from "lucide-react";
import { TaskItemDate } from "@/src/components/task/TaskItemDate";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { FormattedMessage } from "react-intl";
import { use } from "react";

import { FormContainer } from "@/src/components/common/FormContainer";
import { Navigation } from "@/src/components/common/Navigation";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { TaskItemPriority } from "@/src/components/task/TaskItemPriority";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const task = useTaskQuery(Number(id));

  if (task.isLoading) {
    return <LoadingScreen taskQuery={task} />;
  }

  if (task.isError) {
    return (
      <div className="container max-w-xl mx-auto py-10 h-screen flex items-center justify-center">
        <Card className="w-full border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400 text-center">
              <FormattedMessage
                defaultMessage="Fehler beim Laden der Aufgabe."
                id="TaskDetail.error"
              />
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!task.data) {
    return (
      <div className="container max-w-xl mx-auto py-10 h-screen flex items-center justify-center">
        <Card className="w-full border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="pt-6">
            <p className="text-yellow-600 dark:text-yellow-400 text-center">
              <FormattedMessage
                defaultMessage="Aufgabe nicht gefunden."
                id="TaskDetail.notFound"
              />
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { title, description, tags, complete, id: taskId } = task.data;

  return (
    <>
      <Navigation className="mb-20" />
      <FormContainer size="4xl">
        <Card className="border-border bg-card mb-6">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center justify-between mb-4">
              <TaskItemPriority priority={task.data.priority} />
              <TaskItemActions id={taskId} title={title} complete={complete} />
            </div>
            <h1 className="text-3xl font-light tracking-tight">
              <span
                className={complete ? "line-through text-muted-foreground" : ""}
              >
                {title}
              </span>
            </h1>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Beschreibung Sektion */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    <FormattedMessage
                      defaultMessage="Beschreibung"
                      id="TaskDetail.description"
                    />
                  </span>
                </div>
                <div className="bg-muted/30 border border-border/40 rounded-lg p-4">
                  <TaskItemDescription
                    description={description}
                    className="prose dark:prose-invert max-w-none"
                  />
                </div>
              </div>

              {/* Tags Sektion */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    <FormattedMessage
                      defaultMessage="Tags"
                      id="TaskDetail.tags"
                    />
                  </span>
                </div>
                <div className="bg-muted/30 border border-border/40 rounded-lg p-4">
                  <TaskItemTags tags={tags} />
                </div>
              </div>

              {/* Zeitstempel Sektion */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    <FormattedMessage
                      defaultMessage="Zeitstempel"
                      id="TaskDetail.timestamps"
                    />
                  </span>
                </div>
                <div className="bg-muted/30 border border-border/40 rounded-lg p-4">
                  <TaskItemDate
                    createdAt={task.data.createdAt}
                    updatedAt={task.data.updatedAt ?? null}
                    dueDate={task.data.dueDate ?? null}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button
            variant="ghost"
            className="gap-2 bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            <FormattedMessage
              defaultMessage={"Zurück zur Startseite"}
              id="Navigation.back"
            />
          </Button>
        </div>
      </FormContainer>
    </>
  );
}
