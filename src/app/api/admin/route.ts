import { NextRequest, NextResponse } from "next/server";

import { Token } from "src/service";
import prisma from "../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    let jwt = req.cookies.get("token")?.value;

    if (!jwt) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const payload = await Token.verifyJwtToken(jwt);

    if (!payload) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 500 });
    }

    if (payload.isAdmin) {
      const pessoasNotVerified = await prisma.pessoa.findMany({
        where: {
          cracha: {
            verified: false,
          },
        },
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

      return NextResponse.json(
        { message: "OK", pessoasNotVerified },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Not admin" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    let jwt = req.cookies.get("token")?.value;

    if (!jwt) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const payload = await Token.verifyJwtToken(jwt);

    if (!payload) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 500 });
    }

    if (payload.isAdmin) {
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
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
