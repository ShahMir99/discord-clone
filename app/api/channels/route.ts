import { currentProfile } from "@/lib/current-profile"
import { Prisma } from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"


export async function POST (req : Request){
    try{

        const profile = await currentProfile()
        const {name , type} = await req.json()
        const {searchParams} = new URL(req.url)
        
        const serverId = searchParams.get("serverId")


        if(!profile){
            return new NextResponse("unauthorized" , {status : 401})
        }

        if(!serverId){
            return new NextResponse("serverId is missing" , {status : 400})
        }

        if(name === "general"){
            return new NextResponse("name cannot be general" , {status : 400})
        }

        if(!name){
            return new NextResponse("name is missing" , {status : 400})
        }
        if(!type){
            return new NextResponse("type is missing" , {status : 400})
        }


        const server = await Prisma.server.update({
            where : {
                id : serverId,
                members : {
                    some : {
                        profileId : profile.id,
                        role : {
                            in : [MemberRole.ADMIN , MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data : {
                channels : {
                    create : {
                        profileId : profile.id,
                        name,
                        type
                    }
                }
            }
        })


        return NextResponse.json(server)

    }catch(err){
        console.log(err)
        return new NextResponse("internal server error" , {status : 500})
    }
}