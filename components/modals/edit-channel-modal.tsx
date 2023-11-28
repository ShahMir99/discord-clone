"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-hook";
import { ChannelType } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Channel name is required",
  }).refine(
    name => name !== "general",
    {
        message : "Channel name cannot be 'general'"
    }
  ),
  type : z.nativeEnum(ChannelType)
});

const EditChannelModal = () => {
  const { isOpen, OnClose, type  , data} = useModal();
  const {channel , channelType} = data;

  const params = useParams();
  const router = useRouter();
  const isModalOpen = isOpen && type === "editChannel";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type : channel?.type || ChannelType.TEXT
    },
  });

  useEffect(() => {
    if(channel){
      form.setValue("name" , channel.name)
      form.setValue("type" , channel.type)
    }
  },[channel , form])

  const isLoading = form.formState.isSubmitting;

  const onSubmiting = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/channels/${channel?.id}?serverId=${params?.serverId}`, values);
      form.reset();
      router.refresh();
      OnClose()
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    form.reset();
    OnClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmiting)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Channel Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="
                        bg-zinc-300/50
                        border-0
                        focus-visible:ring-0
                        text-black
                        "
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Channel Type
                    </FormLabel>
                    <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                            <SelectValue className="Select a channel type">
                            </SelectValue>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {Object.values(ChannelType).map((type) => (
                                <SelectItem key={type} value={type}  className="capitalize">
                                    {type.toLowerCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="primary">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditChannelModal;
