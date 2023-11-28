import { serverWithMembersWithProfile } from "@/types";
import { Channel, ChannelType, Server } from "@prisma/client";
import {create} from "zustand"

export type ModalType = "createServer"   | "invite"       |
                        "serverSettings" | "manageMember" |
                        "createChannel"  | "leaveServer"  |
                        "deleteServer"   | "deleteChannel"|
                        "editChannel"    | "messageFile"  |
                        "deleteMessage"

interface ModalData {
    server? : serverWithMembersWithProfile;
    channel? : Channel;
    channelType? : ChannelType;
    apiUrl? : string;
    query? : Record<string , any>

}

interface ModalStore {
    type : ModalType | null
    isOpen : boolean;
    data : ModalData;
    OnOpen : (type : ModalType , data? : ModalData) => void;
    OnClose : () => void;
}


export const useModal = create<ModalStore>((set) => ({
    type : null,
    isOpen : false,
    data : {},
    OnOpen : (type , data = {}) => set({isOpen : true , type , data}),
    OnClose : () => set({isOpen : false , type : null})
}))