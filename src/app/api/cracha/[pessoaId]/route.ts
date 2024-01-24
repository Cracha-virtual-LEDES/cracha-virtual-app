import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../../lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: NextRequest, params: Params) {
    try {

        const pessoaId = parseInt(params.params.pessoaId);

        const cracha = await prisma.cracha.findFirst({
            where: { pessoaId: pessoaId },
        });

        return NextResponse.json({ message: "OK", cracha }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, params: Params) {
    try {

        const pessoaId = parseInt(params.params.pessoaId);

        const data = await req?.json();

        const cracha = await prisma.cracha.update({
            where: { pessoaId: pessoaId },
            data: data
        });

        const pessoa = await prisma.pessoa.update({
            where: { id: pessoaId },
            data: { verified: false }
        });

        return NextResponse.json({ message: "OK", cracha , pessoa}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}