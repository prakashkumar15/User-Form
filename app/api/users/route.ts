import { User } from "@/lib/types";
import { NextResponse } from "next/server";

// Shared global store
declare global {
  var users: User[];
}

if (!globalThis.users) {
  globalThis.users = [];
}

export async function GET() {
  return NextResponse.json(globalThis.users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newUser: User = {
    id: Date.now(),
    ...body,
  };

  globalThis.users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
