import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tasksTable } from "@/src/db/schema/tasks";
import { auth } from "@/src/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);

    // Nur Tasks des eingeloggten Users laden
    const task = await db
      .select()
      .from(tasksTable)
      .where(
        and(eq(tasksTable.id, id), eq(tasksTable.userId, session.user.id))
      );

    if (task.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task[0]);
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const now = new Date();

    const { dueDate, ...restOfBody } = body;

    const updatePayload: Record<string, unknown> = {
      ...restOfBody,
      updatedAt: now,
    };

    if (body.hasOwnProperty("dueDate")) {
      updatePayload.dueDate = dueDate ? new Date(dueDate) : null;
    }

    // Nur Tasks des eingeloggten Users updaten
    const result = await db
      .update(tasksTable)
      .set(updatePayload)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, session.user.id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);

    // Nur Tasks des eingeloggten Users löschen
    const result = await db
      .delete(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, session.user.id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
