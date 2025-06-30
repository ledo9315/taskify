import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tasksTable } from "@/src/db/schema/tasks";
import { auth } from "@/src/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

// CORS Headers hinzufügen
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

function addCorsHeaders(response: NextResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return addCorsHeaders(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
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
      return addCorsHeaders(
        NextResponse.json({ error: "Task not found" }, { status: 404 })
      );
    }

    return addCorsHeaders(NextResponse.json(task[0]));
  } catch (error) {
    console.error("Error fetching task:", error);
    return addCorsHeaders(
      NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
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
      return addCorsHeaders(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const now = new Date();

    const { dueDate, title, description, complete, priority, tags, userId } =
      body;

    const updatePayload: Record<string, unknown> = {
      updatedAt: now,
    };

    // Nur definierte Felder hinzufügen (keine ID!)
    if (title !== undefined) updatePayload.title = title;
    if (description !== undefined) updatePayload.description = description;
    if (complete !== undefined) updatePayload.complete = complete;
    if (priority !== undefined) updatePayload.priority = priority;
    if (tags !== undefined) updatePayload.tags = tags;
    if (userId !== undefined) updatePayload.userId = userId;

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
      return addCorsHeaders(
        NextResponse.json({ error: "Task not found" }, { status: 404 })
      );
    }

    return addCorsHeaders(NextResponse.json(result[0]));
  } catch (error) {
    console.error("Error updating task:", error);
    return addCorsHeaders(
      NextResponse.json({ error: "Failed to update task" }, { status: 500 })
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
      return addCorsHeaders(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);

    // Nur Tasks des eingeloggten Users löschen
    const result = await db
      .delete(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, session.user.id)))
      .returning();

    if (result.length === 0) {
      return addCorsHeaders(
        NextResponse.json({ error: "Task not found" }, { status: 404 })
      );
    }

    return addCorsHeaders(NextResponse.json({ success: true }));
  } catch (error) {
    console.error("Error deleting task:", error);
    return addCorsHeaders(
      NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}
