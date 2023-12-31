"use client";

import { serverWithMembersWithProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuSeparator ,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-hook";

interface ServerHeaderProps {
  server: serverWithMembersWithProfile;
  role?: MemberRole;
}

const ServerHeader: React.FC<ServerHeaderProps> = ({ server, role }) => {

    const {OnOpen} = useModal()

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button
        className="w-full text-md font-semibold px-3 flex 
        items-center h-12 border-neutral-200
        dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10
        dark:hover:bg-zinc-700/50 transition
        ">
            {server.name}
            <ChevronDown className="h-5 w-5 ml-auto hidden md:block"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
      className="
      w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]
      "
      >
        {
            isModerator && (
                <DropdownMenuItem
                onClick={() => OnOpen("invite" , {server})}
                className="
                text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer
                ">
                    Invite people
                    <UserPlus className="h-5 w-5 ml-auto"/>
                </DropdownMenuItem>
            )
        }
        {
            isAdmin && (
                <DropdownMenuItem
                onClick={() => OnOpen("serverSettings" , {server})}
                className="
                 px-3 py-2 text-sm cursor-pointer
                ">
                    Server Settings
                    <Settings className="h-5 w-5 ml-auto"/>
                </DropdownMenuItem>
            )
        }
        {
            isAdmin && (
                <DropdownMenuItem
                onClick={() => OnOpen("manageMember" , {server})}
                className="
                 px-3 py-2 text-sm cursor-pointer
                ">
                    Manage Members
                    <Users className="h-5 w-5 ml-auto"/>
                </DropdownMenuItem>
            )
        }
        {
            isModerator && (
                <DropdownMenuItem
                onClick={() => OnOpen("createChannel")}
                className="
                 px-3 py-2 text-sm cursor-pointer
                ">
                    Create Channel
                    <PlusCircle className="h-5 w-5 ml-auto"/>
                </DropdownMenuItem>
            )
        }
        {
            isModerator && (
                <DropdownMenuSeparator />
            )
        }
        {
            isAdmin && (
                <DropdownMenuItem
                onClick={() => OnOpen("deleteServer" , {server})}
                className="
                text-rose-500 px-3 py-2 text-sm cursor-pointer
                ">
                    Delete Server
                    <Trash className="h-5 w-5 ml-auto"/>
                </DropdownMenuItem>
            )
        }
        {
            !isAdmin && (
                <DropdownMenuItem 
                onClick={() => OnOpen("leaveServer" , {server})}
                className="
                text-rose-500 px-3 py-2 text-sm cursor-pointer
                ">
                    Leave Server
                    <LogOut className="h-5 w-5 ml-auto"/>
                </DropdownMenuItem>
            )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
