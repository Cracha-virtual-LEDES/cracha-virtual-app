import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { PasswordCrypto } from "src/service";
// import { Token } from "src/service";

export async function GET(req: NextRequest) {}

// POST /api/login
export async function POST(req: NextRequest) {
  try {
    // const token = req.headers.get("Authorization");
    const { email, password } = await req.json();
    const user = await prisma.pessoa.findUnique({ where: { email: email } });
    if (
      !user ||
      !(await PasswordCrypto.comparePassword(password, user.password))
    ) {
      return NextResponse.json(
        { message: "Credentials invalid" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "OK", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
