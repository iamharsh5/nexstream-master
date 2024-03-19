"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import Image from "next/image";
import { Switch } from "../ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";

type FieldTypes = "isLive"

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
  label?: string; // Make label, value, and field optional
  value?: boolean;
  field?: FieldTypes;
};

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
  label = '', // Provide default values for label, value, and field
  value = false,
  field = 'isLive',
}: InfoModalProps) => {
  const [isLive, setIsLive] = useState<boolean>(value);
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnailUrl("");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }
  // const onLive = () => {
  //   setIsLive((prev) => !prev);
  //   startTransition(() => {
  //      updateStream({ [field]: !value })
  //       .then(() => toast.success("Chat settings updated!"))
  //       .catch(() => toast.error("Something went wrong"));
  //   });
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"))
    });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit stream info
          </DialogTitle>
        </DialogHeader>
        {/* <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">
          {label}
        </p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            onCheckedChange={(newValue: boolean) => onLive(newValue)}
            checked={value}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div> */}
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>
              Name
            </Label>
            <Input
              disabled={isPending}
              placeholder="Stream name"
              onChange={onChange}
              value={name}
            />
          </div>
          <div className="space-y-2">
            <Label>
              Thumbnail
            </Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF"
                    },
                    allowedContent: {
                      color: "#FFFFFF"
                    }
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              variant="primary"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
