import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useOrigin from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
interface PublishProps {
  initialData: Doc<"documents">;
}
const Publish = ({ initialData }: PublishProps) => {
  const orgin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setcopied] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setisSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setisSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published",
      error: "Failed to publish note",
    });
  };

  const onUnPublish = () => {
    setisSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setisSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note unpublished",
      error: "Failed to unpublish note",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setcopied(true);
    setTimeout(() => setcopied(false), 1000);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className=" text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className=" space-y-4 ">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-sm font-medium text-sky-500">
                This note is live on web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-sm border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4 " />
                ) : (
                  <Copy className="h-4 w-4 " />
                )}
              </Button>
            </div>
            <Button
              className="w-full text-sm"
              size="sm"
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              UnPublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />

            <p className=" text-sm font-medium mb-2">Publish this note</p>
            <span className="text-sm text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
