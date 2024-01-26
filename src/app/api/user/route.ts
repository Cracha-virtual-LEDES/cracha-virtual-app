import { NextRequest, NextResponse } from "next/server";
import { Token, PasswordCrypto, Authentication } from "src/service/index";
import { Pessoa } from "@prisma/client";
import prisma from "../../../../lib/db";

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

export async function PUT(req: NextRequest) {
  try {
    let jwt = req.cookies.get("token")?.value;

    if (!jwt) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const payload = await Token.verifyJwtToken(jwt) as Pessoa;

    if (!payload) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 500 });
    }

    const pessoaId = payload.id;
    const data = await req.json();

    let newData = data;

    if(newData.password){
      newData.password = await PasswordCrypto.hashPassword(newData.password)
    }

    const pessoa = await prisma.pessoa.update({
      where: { id: pessoaId },
      data: { ...newData, isAdmin: undefined, id: undefined}
    })

    const cracha = await prisma.cracha.update({
      where: { pessoaId: pessoaId },
      data: { verified: false }
    })

    return NextResponse.json({ message: "OK", user: {pessoa: {...pessoa, password: undefined}, cracha} }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}