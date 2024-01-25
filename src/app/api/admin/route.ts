import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { Token } from "src/service";

export async function GET(req: NextRequest) {
    try {

        let jwt = await req.headers.get("authorization");

        let token = jwt?.substring(jwt.indexOf(" ") + 1, jwt.length) || "";

        const payload = await Token.verifyJwtToken(token);  

        if(payload?.isAdmin){
            const pessoas = await prisma.pessoa.findMany({
                where: {
                    verified: false
                },
                include: {cracha: true}
            })
    
            return NextResponse.json({ message: "OK", pessoas }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Not admin"}, { status: 403 });
        }

    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {

        // TODO verificar se é admin pelo JWT

        const pessoaToVerify = await req?.json();

        const pessoa = await prisma.pessoa.update({
            where: { id: pessoaToVerify.id },
            data: { verified: true }
        });

        return NextResponse.json({ message: "OK", pessoa}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}