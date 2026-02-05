import { User } from "@/lib/types";
import { NextResponse } from "next/server";

declare global {
  var users: User[];
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await req.json();
  const userId = Number(id);

  globalThis.users = globalThis.users.map((u) =>
    u.id === userId ? { ...u, ...body } : u,
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const userId = Number(id);

  globalThis.users = globalThis.users.filter((u) => u.id !== userId);

  return NextResponse.json({ success: true });
}
