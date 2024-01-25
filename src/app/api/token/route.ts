import { Pessoa } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Token } from "src/service";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    const user = (await Token.verifyJwtToken(token)) as Pessoa;

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // nome, email, id, isAdmin, role
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    };

    return NextResponse.json({ message: "OK", data }, { status: 200 });
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
