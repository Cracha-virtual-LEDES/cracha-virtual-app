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
    const user = await prisma.user.create({
      data: newData,
    });
    return NextResponse.json({ message: "OK", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { id } = await req?.json();
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return NextResponse.json({ message: "OK", user }, { status: 200 });
}
