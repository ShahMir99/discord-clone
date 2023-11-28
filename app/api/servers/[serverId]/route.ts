import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server"
import { Prisma } from "@/lib/db";
import { MemberRole } from "@prisma/client";


export async function PATCH (req : Request , {params} : {params : {serverId : string}}){
    try{
        const {name , imageUrl} = await req.json();
        const profile = await currentProfile()

        if(!profile){
            return new NextResponse("Unauthorized" , {status : 500})
        }

        const server = await Prisma.server.update({
            where : {
                id : params.serverId
            },
            data : {
                name,
                imageUrl,
            }
        })

        return NextResponse.json(server)

    }catch(err){
        console.log("[SERVERS_SERVERID_PATCH]" , err)
        return new NextResponse("Internal server error" , {status : 500})
    }
}

export async function DELETE (req : Request , {params} : {params : {serverId : string}}){
    try{
        const profile = await currentProfile()


        if(!profile){
            return new NextResponse("Unauthorized" , {status : 500})
        }

        const server = await Prisma.server.delete({
            where : {
                id : params.serverId,
                profileId : profile.id
            },
        })

        return NextResponse.json(server)

    }catch(err){
        console.log("[SERVERS_SERVERID_DELETE]" , err)
        return new NextResponse("Internal server error" , {status : 500})
    }
}