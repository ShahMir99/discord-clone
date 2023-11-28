"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-hook";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LeaverServer = () => {
  const [Loading, SetLoading] = useState(false);
  const {isOpen, OnClose, type, data } = useModal();
  const { server } = data;

  const router = useRouter()

  const isModalOpen = isOpen && type === "leaveServer";


  const OnDelete = async () => {
    try {
      SetLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      OnClose()
      router.refresh()
    } catch (err) {
      console.log(err);
      SetLoading(false);
    }finally{
        SetLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={OnClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leaver Server
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Are you sure you want to leave <span className="font-semibold text-indigo-500">{server?.name}</span> ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
                <Button
                onClick={OnClose}
                disabled={Loading}
                variant="ghost"
                >
                Cancel
                </Button>

                <Button
                onClick={() => OnDelete()}
                disabled={Loading}
                variant="primary"
                >
                Confirm
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaverServer;
