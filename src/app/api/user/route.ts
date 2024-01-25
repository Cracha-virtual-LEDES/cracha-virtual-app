import { NextRequest, NextResponse } from "next/server";
import { Authentication } from "src/service";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await Authentication.register(data);

    return NextResponse.json({ message: "OK", user }, { status: 201 });
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