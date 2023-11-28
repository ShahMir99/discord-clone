"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-hook";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/useOrigin";
import { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";

const InviteServerModal = () => {
  const [Loading, SetLoading] = useState(false);
  const [isCopied, SetIsCopied] = useState(false);
  const Origin = useOrigin();
  const { OnOpen, isOpen, OnClose, type, data } = useModal();

  const { server } = data;

  const isModalOpen = isOpen && type === "invite";

  const InviteLink = `${Origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(InviteLink);
    SetIsCopied(true);

    setTimeout(() => {
      SetIsCopied(false);
    }, 2000);
  };

  const OnNew = async () => {
    try {
      SetLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      OnOpen("invite", { server: response.data });
      SetLoading(false);
    } catch (err) {
      console.log(err);
      SetLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={OnClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Frineds
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Label className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 selection:bg-transparent border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={InviteLink}
              disabled={Loading}
            />
            <Button size="icon" onClick={onCopy} disabled={Loading}>
              {isCopied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-zinc-500 mt-4 p-0"
            onClick={OnNew}
            disabled={Loading}
          >
            Generate new Link
            <RefreshCw
              className={cn(
                "w-4 h-4 ml-3",
                Loading && "animate-spin text-indigo-500"
              )}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteServerModal;
