"use client";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentsListProp {
  parentDocument?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

const DocumentsList = ({ parentDocument, level = 0 }: DocumentsListProp) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setexpanded] = React.useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setexpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSideBar, {
    parentDocument: parentDocument,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  //documents will be undefined only when it is loading otherwise null or an array of values
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80 ",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages Inside
      </p>
      {documents.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            onClick={() => onRedirect(doc._id)}
            label={doc.title}
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
            level={level}
            onExpand={() => onExpand(doc._id)}
            expanded={expanded[doc._id]}
          />
          {expanded[doc._id] && (
            <DocumentsList parentDocument={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentsList;
