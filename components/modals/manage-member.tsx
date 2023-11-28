"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-hook";
import { useOrigin } from "@/hooks/useOrigin";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { serverWithMembersWithProfile } from "@/types";
const ManageMemberModal = () => {
  const [LoadingId, setLoadingId] = useState("");
  const { OnOpen, isOpen, OnClose, type, data } = useModal();

  const router = useRouter()
  const Origin = useOrigin();
  const { server } = data as { server: serverWithMembersWithProfile };

  const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
  };

  const isModalOpen = isOpen && type === "manageMember";


  const onRoleChange = async (memberId : string , role : MemberRole) => {
    try{
      setLoadingId(memberId)
      const response = await axios.patch(`/api/members/${memberId}?serverId=${server?.id}` , {role})
      router.refresh()
      OnOpen("manageMember" , {server : response.data})
    }catch(err){
      console.log(err)
      setLoadingId("")
    }finally{
      setLoadingId("")
    }
  }

  const onKickUser = async (memberId : string) => {
    try{
      setLoadingId(memberId)
      const response = await axios.delete(`/api/members/${memberId}?serverId=${server?.id}`)
      router.refresh()
      OnOpen("manageMember" , {server : response.data})
    }catch(err){
      console.log(err)
      setLoadingId("")
    }finally{
      setLoadingId("")
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={OnClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member?.profile?.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-sm font-semibold flex items-center gap-x-1">
                  {member?.profile?.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                LoadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreVertical className="h-5 w-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                              onClick={() => onRoleChange(member.id , "GUEST")}
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                              onClick={() => onRoleChange(member.id , "MODERATOR")}
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                MODERATOR
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                        onClick={() => onKickUser(member.id)}
                        >
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {LoadingId === member.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto h-4 w-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMemberModal;
