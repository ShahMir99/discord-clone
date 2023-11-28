import { currentProfile } from "@/lib/current-profile"
import { Prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import {v4 as uuidv4} from "uuid"


export async function PATCH (
    req : Request,
    {params} : {params : {serverId : string}}
    ){

    try{
        
        const profile = await currentProfile()

        if(!profile){
            return new NextResponse("unauthorized" , {status : 401})
        }

        if(!params.serverId){
            return new NextResponse("server id missing" , {status : 401})
        }

        const server = await Prisma.server.update({
            where : {
                id : params.serverId
            },
            data : {
                inviteCode : uuidv4()
            }
        })


        return NextResponse.json(server)

    }catch(err){
        console.log("[SERVER/SERVERID/PATCH]" ,err)
        return new NextResponse("Internal server error" , {status : 500})
    }
}