import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const exists = await prisma.user.findUnique({
        where: { email, }
    });

    if (exists) {
        return NextResponse.json({ error: "User already exist" }, { status: 400 })
    }

    else {
        const user = await prisma.user.create({
            data: {
                email,
                password
            }
        })

        return NextResponse.json(user);
    }
}
