import { currentProfile } from "@/lib/current-profile";
import { Prisma } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const InviteCode = async ({params}: {params : {invitecode : string}}) => {
    const profile = await currentProfile()

    if(!profile){
        return redirect("/sign-in")
    }

    if(!params.invitecode){
        return redirect("/")
    }

    const exsitingServer = await Prisma.server.findFirst({
        where : {
            inviteCode : params.invitecode,
            members : {
                some : {
                    profileId : profile.id
                }
            }

        }
    })


    if(exsitingServer){
        return redirect(`/servers/${exsitingServer.id}`)
    }

    const server = await Prisma.server.update({
        where : {
            inviteCode :  params.invitecode,
        },
        data : {
            members : {
                create : [
                    {
                        profileId : profile.id
                    }
                ]
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    }

    return null;
}
 
export default InviteCode;