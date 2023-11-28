"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-hook";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

const DeleteServer = () => {
    
  const [Loading, SetLoading] = useState(false);
  const {isOpen, OnClose, type, data } = useModal();
  const { server } = data;

  const isModalOpen = isOpen && type === "deleteServer";


  const OnDelete = async () => {
    try {
      SetLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      OnClose()
      window.location.reload()
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
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Are you sure you want to do this ? <br/><span className="font-semibold text-indigo-500">{server?.name} </span>
            will be deleted permanently
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
                className="bg-rose-500 text-white"
                >
                Delete
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServer;
