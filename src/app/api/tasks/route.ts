import { auth } from "@/src/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tasksTable } from "@/src/db/schema/tasks";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

// CORS Headers hinzufügen
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

function addCorsHeaders(response: NextResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return addCorsHeaders(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }

    const tasks = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.userId, session.user.id));

    return addCorsHeaders(NextResponse.json(tasks));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return addCorsHeaders(
      NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return addCorsHeaders(
        NextResponse.json(
          {
            error: "Unathorized",
          },
          { status: 401 }
        )
      );
    }

    const body = await request.json();
    const { title, description, tags = [], dueDate, priority = 0 } = body;

    const now = new Date();

    const result = await db
      .insert(tasksTable)
      .values({
        title,
        description,
        tags,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        complete: false,
        userId: session.user.id,
        createdAt: now,
      })
      .returning();

    return addCorsHeaders(NextResponse.json(result[0], { status: 201 }));
  } catch (error) {
    console.error("Error creating task:", error);
    return addCorsHeaders(
      NextResponse.json({ error: "Failed to create task" }, { status: 500 })
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}
