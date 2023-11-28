"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios"

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useEffect, useState } from "react";
import { UploadFile } from "../UploadFile";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

const InitialModal = () => {

    const [isMounted , setisMounted] = useState(false)
    const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmiting = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers" , values)
      form.reset()
      router.refresh()
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setisMounted(true)
  },[])


  if(!isMounted){
    return null
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image, you can
            always change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmiting)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField 
                control={form.control}
                name="imageUrl"
                render={({field}) => (
                  <FormItem>
                     <FormControl>
                      <UploadFile
                      endpoint="serverImage"
                      value={field.value}
                      onChange={field.onChange}
                      />
                     </FormControl>
                  </FormItem>
                )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server name
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
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
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

export default InitialModal;
