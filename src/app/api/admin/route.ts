import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { Token } from "src/service";

export async function GET(req: NextRequest) {
    try {

        let jwt = await req.headers.get("authorization");

        let token = jwt?.substring(jwt.indexOf(" ") + 1, jwt.length) || "";

        const payload = await Token.verifyJwtToken(token);  

        if(payload?.isAdmin){

            const crachas = await prisma.cracha.findMany({
                where: {
                    verified: false
                },
                include: {pessoa: true}
            })
    
            return NextResponse.json({ message: "OK", crachas }, { status: 200 });
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

        const crachaToVerify = await req?.json();

        const cracha = await prisma.cracha.update({
            where: { id: crachaToVerify.id },
            data: { verified: true }
        });

        return NextResponse.json({ message: "OK", cracha }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}