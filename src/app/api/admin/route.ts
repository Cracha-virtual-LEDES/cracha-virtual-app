import prisma from "../../../../lib/db";

import { Pessoa } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Token } from "src/service";

// Ler todas as solicitações de alteração
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

    if (user.isAdmin) {
      const pessoas = await prisma.pessoa.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          CPF: true,
          role: true,
          cracha: {
            select: {
              id: true,
              photoPath: true,
              verified: true,
              expirationDate: true,
            },
          },
        },
      });

      return NextResponse.json({ message: "OK", pessoas }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Not admin" }, { status: 403 });
    }
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

// Verificar alterações
export async function PATCH(req: NextRequest) {
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

    if (user.isAdmin) {
      const crachaToVerify = await req?.json();

      const newExpirationDate = new Date();
      newExpirationDate.setFullYear(newExpirationDate.getFullYear() + 1);

      const cracha = await prisma.cracha.update({
        where: { id: crachaToVerify.id },
        data: { verified: true, expirationDate: newExpirationDate },
      });

      return NextResponse.json({ message: "OK", cracha }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Not admin" }, { status: 403 });
    }
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
