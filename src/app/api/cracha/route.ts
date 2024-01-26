import prisma from "../../../../lib/db";

import { Pessoa } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Token } from "src/service";

// Buscar crachá por ID da pessoa
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

        const cracha = await prisma.cracha.findFirst({
            where: { pessoaId: user.id },
        });

        return NextResponse.json({ message: "OK", cracha }, { status: 200 });

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

//Edição de crachá
export async function PUT(req: NextRequest) {
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

        const data = await req?.json();

        const cracha = await prisma.cracha.update({
            where: { pessoaId: user.id },
            data: { ...data, verified: false, expirationDate: undefined, id: undefined, pessoaId: undefined }
        });

        return NextResponse.json({ message: "OK", cracha }, { status: 200 });
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