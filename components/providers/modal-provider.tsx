"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";
import InviteServerModal from "../modals/invite-server-modal";
import ServerSettingsModal from "../modals/server-settings-modal";
import ManageMemberModal from "../modals/manage-member";
import CreateChannelModal from "../modals/create-channel-modal";
import LeaverServer from "../modals/leaver-server";
import DeleteServer from "../modals/delete-server";
import DeleteChannel from "../modals/delete-channel-modal";
import EditChannelModal from "../modals/edit-channel-modal";
import MessageFileModal from "../modals/message-file-modal";
import { DeleteMessageModal } from "../modals/delete-message-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteServerModal />
      <ServerSettingsModal />
      <ManageMemberModal />
      <CreateChannelModal />
      <LeaverServer />
      <DeleteServer />
      <DeleteChannel />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};

export default ModalProvider;
