import { currentProfile } from "@/lib/current-profile";
import { Prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-Item";
import { NavigationAction } from "./navigation-action";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {

    const profile = await currentProfile()

    if(!profile){
        return redirect("/")
    }

    const server = await Prisma.server.findMany({
        where : {
            members : {
                some : {
                    profileId : profile.id
                }
            }
        }
    })


    return ( 
        <div
        className="space-y-4 flex flex-col items-center h-full
        text-primary w-full py-3 p-1 dark:bg-[#1E1F22] bg-[#E3E5E8]">
            <NavigationAction />
            <Separator className="h-[2px] w-10 bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto"/>
            <ScrollArea className="flex-1 w-full">
                {
                    server.map((server) => (
                        <div key={server.id} className="mb-4">
                           <NavigationItem server={server}/>
                        </div>
                    ))
                }
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-2">
                <ModeToggle />
                <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements : {
                        avatarBox : "h-[40px] w-[40px]"
                    }
                }}/>
            </div>
        </div>
     );
}