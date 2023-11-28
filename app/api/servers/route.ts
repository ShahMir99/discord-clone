import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server"
import { Prisma } from "@/lib/db";
import { MemberRole } from "@prisma/client";


export async function POST (req : Request){
    try{
        const {name , imageUrl} = await req.json();
        const profile = await currentProfile()

        if(!profile){
            return new NextResponse("Unauthorized" , {status : 500})
        }

        const server = await Prisma.server.create({
            data : {
                profileId : profile.id,
                name,
                imageUrl,
                inviteCode : uuidv4(),
                channels : {
                    create : [
                        {name : "general" , profileId : profile.id}
                    ]
                },
                members : {
                    create : [
                        {profileId : profile.id , role : MemberRole.ADMIN}
                    ]
                }
            }
        })

        return NextResponse.json(server)

    }catch(err){
        console.log("[SERVERS_POST]" , err)
        return new NextResponse("Internal server error" , {status : 500})
    }
}