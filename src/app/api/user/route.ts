import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { PasswordCrypto } from "../../../service";

export async function POST(req: NextRequest) {
  try {
    const data = await req?.json();
    const newData = {
      ...data,
      password: await PasswordCrypto.hashPassword(data.password),
    };

    const color = newData.color;

    delete newData.color;

    const user = await prisma.pessoa.create({
      data: newData,
    });

    const cracha = await prisma.cracha.create({
      data: { color: color, pessoaId: user.id }
    });

    return NextResponse.json({ message: "OK", user , cracha}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { id } = await req?.json();
  const user = await prisma.pessoa.findUnique({
    where: { id: id },
  });
  return NextResponse.json({ message: "OK", user }, { status: 200 });
}
