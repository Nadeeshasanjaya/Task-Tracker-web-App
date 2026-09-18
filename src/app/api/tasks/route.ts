import { prisma } from "@/lib/prisma";
import { handleApiError, requireUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await requireUser();
    const tasks = await prisma.task.findMany({
      where: { userId: user.id },
      orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
    });
    return Response.json(tasks);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();

    const { title, description, priority, status, dueDate } = body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        priority: priority ?? "MEDIUM",
        status: status ?? "TODO",
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: user.id,
      },
    });

    return Response.json(task, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
