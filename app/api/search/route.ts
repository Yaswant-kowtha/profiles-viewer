import  {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
    const body = await req.json();
    console.log(req.nextUrl.searchParams.get("name"))
    const username = req.nextUrl.searchParams.get("name")
    if(typeof username !== 'string'){
        return NextResponse.json({
            message: "Invalid query parameter"
        },{
            status: 411
        })
    }
    try{
        const searchResults = await client.user.findMany({
            where: {
                username: {
                    contains: username,
                    mode:'insensitive',
                },
            },
        
        });
        return NextResponse.json({
            searchResults
        })
    }
    catch(e){
        return NextResponse.json({
            message: "Error fetching search results"
        },{
            status: 411
        })
    }
    
}