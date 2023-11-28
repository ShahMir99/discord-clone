"use client"

import { serverWithMembersWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-hook";

interface ServerSectionProps {
    label : string;
    role? : MemberRole;
    sectionType : "channels" | "members";
    channelType? : ChannelType;
    server? : serverWithMembersWithProfile
}

const ServerSection : React.FC<ServerSectionProps> = ({
    label,
    role,
    sectionType,
    channelType,
    server
}) => {

    const {OnOpen} = useModal();

  return (
    <div className="flex items-center justify-between py-2">
        <p className="text-xs uppercase font-semibold
        text-zinc-500 dark:text-zinc-400
        ">
            {label}
        </p>
        {
            role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip
                side="top"
                label="Create Channel"
                >
                    <button
                    onClick={() => OnOpen("createChannel" , {channelType})}
                    className="
                    text-zinc-500 hover:text-zinc-600
                    dark:text-zinc-400 dark:hover:text-zinc-300
                    transition
                    ">
                        <Plus className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )
        }
        {
            role !== MemberRole.GUEST && sectionType === "members" && (
                <ActionTooltip
                side="top"
                label="Manage Members"
                >
                    <button
                    onClick={() => OnOpen("manageMember" , {server})}
                    className="
                    text-zinc-500 hover:text-zinc-600
                    dark:text-zinc-400 dark:hover:text-zinc-300
                    transition
                    ">
                        <Settings className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )
        }
    </div>
  )
}

export default ServerSection