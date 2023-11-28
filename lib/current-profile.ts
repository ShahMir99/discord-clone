import { auth } from "@clerk/nextjs"
import { Prisma } from "./db";


export const currentProfile = async () => {
    const {userId} = auth()

    if(!userId){
        return null;
    }

    const profile = await Prisma.profile.findUnique({
        where : {
            userId
        }
    })

    return profile;
}