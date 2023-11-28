import { getAuth } from "@clerk/nextjs/server"
import { Prisma } from "./db";
import { NextApiRequest } from "next";


export const currentProfilePages = async (req : NextApiRequest) => {
    const {userId} = getAuth(req)

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