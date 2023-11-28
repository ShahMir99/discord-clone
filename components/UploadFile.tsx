"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { File, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface UploadFileProps {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: any) => void;
}

export const UploadFile: React.FC<UploadFileProps> = ({
  endpoint,
  value,
  onChange,
}) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-32 w-32">
        <Image fill src={value} alt="upload" className="rounded-full" />

        <Button
          onClick={() => onChange("")}
          className="bg-rose-500 hover:bg-rose-500 text-white w-6 h-6 p-0 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  if (value && fileType === "pdf"){
    return (
      <div className="
      relative flex items-center p-2 mt-2 rounded-md
      bg-background/10
      ">
        <File className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
        href={value}
        target="_black"
        rel="noopener noreferrer"
        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}

      onUploadError={(err) => {
        console.log(err);
      }}
    />
  );
};
