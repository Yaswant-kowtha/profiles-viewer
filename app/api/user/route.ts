import  {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(req.nextUrl.searchParams.get("name"))
    // TODO: should add zod validation here
    try{
        await client.user.create({
            data: {
                username: body.username,
                password: body.password
            }
        
        });
        return NextResponse.json({
            body
        })
    }
    catch(e){
        return NextResponse.json({
            message: "Error while signing up"
        },{
            status: 411
        })
    }
    

    return NextResponse.json({ message: "Signed up" });
}