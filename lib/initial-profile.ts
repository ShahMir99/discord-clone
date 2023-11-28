import { currentUser , redirectToSignIn } from "@clerk/nextjs";
import { Prisma } from "@/lib/db"

export const getInitialProfile = async () => {
    const user = await currentUser();

    if(!user){
        return redirectToSignIn();
    }

    const profile =  await Prisma.profile.findUnique({
        where : {
            userId : user.id
        }
    })

    if(profile){
        return profile;
    }

    const newProfile = await Prisma.profile.create({
        data : {
            userId : user.id,
            name : `${user.firstName}${user.lastName}`,
            imageUrl : user.imageUrl,
            email : user.emailAddresses[0].emailAddress
        }
    })

    return newProfile;

}