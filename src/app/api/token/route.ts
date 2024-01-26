import prisma from "../../../../lib/db";

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

    const pessoa = await prisma.pessoa.findFirst({
      where: { id: user.id },
    })

    if (pessoa) {
      const data = {
        id: pessoa.id,
        name: pessoa.name,
        email: pessoa.email,
        CPF: pessoa.CPF,
        isAdmin: pessoa.isAdmin,
        role: pessoa.role
      }
      return NextResponse.json({ message: "OK", data }, { status: 200 });
    }


    return NextResponse.json(
      { message: "Unexpected server error" },
      { status: 500 }
    );
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
