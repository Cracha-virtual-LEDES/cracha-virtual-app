import { NextRequest, NextResponse } from "next/server";
import { Authentication } from "src/service";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const token = await Authentication.login({ email, password });

    if (!token) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "OK", token: token }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        { message: "Unexpected server error", error },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unexpected server error" },
      { status: 500 }
    );
  }
}
