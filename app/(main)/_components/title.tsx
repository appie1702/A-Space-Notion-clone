"use client";

import { Doc } from "@/convex/_generated/dataModel";
import React, { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
interface TitleProps {
  initialData: Doc<"documents">;
}
const Title = ({ initialData }: TitleProps) => {
  const update = useMutation(api.documents.update);
  const [isEditing, setisEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, settitle] = useState(initialData.title || "Untitled");

  const enableInput = () => {
    settitle(initialData.title);
    setisEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setisEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settitle(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };
  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          className="h-7 px-2 focus-visible:ring-transparent"
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className=" font-normal h-auto p-1"
        >
          <span className=" truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-8 w-20 rounded-md" />;
};
export default Title;
