import InitialModal from "@/components/modals/InitialModal";
import { Prisma } from "@/lib/db";
import { getInitialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {

    const profile = await getInitialProfile()
    const server = await Prisma.server.findFirst({
        where : {
            members : {
                some : {
                    profileId : profile.id
                }
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    }

    return (
        <InitialModal />
     );
}
 
export default SetupPage;