import { currentProfile } from "@/lib/current-profile"
import { Prisma } from "@/lib/db"
import { NextResponse } from "next/server"


export async function PATCH(
    req : Request,
    {params} : {params : {serverId : string}}
){
    try{

        const profile = await currentProfile()

        if(!profile){
            return new NextResponse("unauthorized" , {status: 401})
        }

        if(!params.serverId){
            return new NextResponse("Serverid is missing" , {status: 400})
        }

        const server = await Prisma.server.update({
            where : {
                id : params.serverId,
                profileId : {
                    not : profile.id
                },
                members : {
                    some : {
                        profileId : profile.id
                    }
                },
            },
            data : {
                members : {
                    deleteMany : {
                        profileId : profile.id
                    }
                }
            }
        })

        return NextResponse.json(server)
        
    }catch(err){
        console.log(err)
        return new NextResponse("internal server error" , {status: 500})
    }
}