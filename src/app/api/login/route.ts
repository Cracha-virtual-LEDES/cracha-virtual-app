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

    const response = NextResponse.json({ message: "OK" }, { status: 200 });

    response.cookies.set({
      name: "token",
      value: token,
    });

    return response;
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