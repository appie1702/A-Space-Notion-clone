"use client";

import { useCoverImage } from "@/hooks/use-cover.image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const CoverImageModal = () => {
  const [file, setfile] = useState<File>();
  const [isSubmitting, setisSubmitting] = useState(false);

  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);

  const onChange = async (file?: File) => {
    if (file) {
      setisSubmitting(true);
      setfile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  const onClose = () => {
    setfile(undefined);
    setisSubmitting(false);
    coverImage.onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className=" text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className=" w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
