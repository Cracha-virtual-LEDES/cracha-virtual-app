import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { Token } from "src/service";
import { Pessoa } from "@prisma/client";

// Buscar crachá por ID da pessoa
export async function GET(req: NextRequest) {
    try {

        let jwt = req.cookies.get("token")?.value;

        if(!jwt){
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        const payload = await Token.verifyJwtToken(jwt) as Pessoa;

        if(!payload){
            return NextResponse.json({ message: "Invalid Token"}, { status: 500 });
        }

        const pessoaId = payload.id;

        const cracha = await prisma.cracha.findFirst({
            where: { pessoaId: pessoaId },
        });

        return NextResponse.json({ message: "OK", cracha }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

//Edição de crachá
export async function PUT(req: NextRequest) {
    try {

        let jwt = req.cookies.get("token")?.value;

        if(!jwt){
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        const payload = await Token.verifyJwtToken(jwt) as Pessoa;

        if(!payload){
            return NextResponse.json({ message: "Invalid Token"}, { status: 500 });
        }

        const crachaId = payload.id;

        const data = await req?.json();

        const cracha = await prisma.cracha.update({
            where: { id: crachaId },
            data: {...data, verified: false}
        });

        return NextResponse.json({ message: "OK", cracha}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}