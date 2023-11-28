import { Prisma } from "./db"



export const getOrCreateConversation = async (memberOneId : string , memberTwoId : string) => {
    let conversation = await findConversation(memberOneId , memberTwoId) ||
                       await  findConversation(memberTwoId , memberOneId)

    if(!conversation){
        conversation = await createConversation(memberTwoId , memberOneId)
    }

    return conversation;
} 


const createConversation = async (memberOneId : string , memberTwoId : string) => {
    try{

        return await Prisma.conversation.create({
            data : {
                memberOneId,
                memberTwoId
            },
            include : {
                memberOne : {
                    include : {
                        profile : true
                    }
                },
                memberTwo : {
                    include : {
                        profile : true
                    }
                }
            }
        })

    }catch(err) {
        console.log(err)
        return null
    }
}

const findConversation = async (memberOneId : string , memberTwoId : string) => {
    try{
        return await Prisma.conversation.findFirst({
            where : {
                AND : [
                    {memberOneId : memberOneId},
                    {memberTwoId : memberTwoId}
                ]
            },
            include : {
                memberOne : {
                    include : {
                        profile : true
                    }
                },
                memberTwo : {
                    include : {
                        profile : true
                    }
                }
            }
        })
    }catch(err) {
        console.log(err)
        return null
    }
}