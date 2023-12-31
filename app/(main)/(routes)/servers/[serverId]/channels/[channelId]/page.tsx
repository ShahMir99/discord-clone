import ChatHeader from "@/components/chat/chat-header"
import ChatInput from "@/components/chat/chat-input"
import ChatMessages from "@/components/chat/chat-messages"
import { currentProfile } from "@/lib/current-profile"
import { Prisma } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface channelIdProps {
  params : {
    serverId : string,
    channelId : string
  }
}

const channelId = async ({
  params 
} : channelIdProps) => {

  const profile = await currentProfile()

  if(!profile){
    return redirectToSignIn()
  }

  const channel = await Prisma.channel.findUnique({
    where : {
      id : params.channelId,
    }
  })

  const member = await Prisma.member.findFirst({
    where : {
      serverId : params.serverId,
      profileId : profile.id
    }
  })

  if(!channel || !member){
    return redirect("/")
  }
  
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
      name={channel.name}
      serverId={channel.serverId}
      type="channel"
      />
      <ChatMessages
      name={channel.name}
      chatId={channel.id}
      member={member}
      type="channel"
      apiUrl="/api/messages"
      socketUrl="/api/socket/messages"
      socketQuery={{
        channelId : channel.id,
        serverId : channel.serverId
      }}
      paramKey="channelId"
      paramValue={channel?.id}
      />
      <ChatInput
      name={channel.name}
      type="channel"
      apiUrl="/api/socket/messages"
      query={{
        channelId : channel.id,
        serverId : channel.serverId
      }}
      />
    </div>  
  )
}

export default channelId