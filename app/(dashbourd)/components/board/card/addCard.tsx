"use client";

import { Plus } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  I_ApiCardCreateRequest,
  I_ApiCardCreateResponse,
} from "@/app/api/account/organizations/cards/route";

import { useBoard } from "@/contexts/BoardContext";

const colors = [
  "bg-lime-700",
  "bg-green-700",
  "bg-red-700",
  "bg-orange-700",
  "bg-yellow-700",
  "bg-cyan-700",
  "bg-sky-700",
  "bg-violet-700",
];

interface AddCardProps {
  list_id: string;
}

export const AddCard = ({ list_id }: AddCardProps) => {
  const router = useRouter();

  const [listId, setListId] = useState(list_id);
  const { reLoad, setReLoad } = useBoard();
  const formRef = useRef<ElementRef<"form">>(null);
  const titleRef = useRef<ElementRef<"input">>(null);
  const descriptionRef = useRef<ElementRef<"input">>(null);
  const [color, setColor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const handleCreateCard = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError("");
    try {
      if (!color || !titleRef.current?.value || !descriptionRef.current?.value)
        throw new Error("Please enter all required fields.");

      const payload: I_ApiCardCreateRequest = {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        color: color,
        listId: listId,
      };

      const response = await fetch("/api/account/organizations/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: I_ApiCardCreateResponse = await response.json();

      if (data.success) {
        // setOpen(false);
        // router.refresh();
        // return;
      }

      throw new Error(data.message);
    } catch (error) {
      let mess = "Something went wrong.";
      if (error instanceof Error) {
        mess = error.message;
      }
      setError(mess);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setOpen(false);
        // router.refresh();
        setReLoad(!reLoad);
      }, 1000);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            // onClick={enableEditing}
            className="flex flex-wrap flex-row text-green-900 gap-0.5"
          >
            <Plus className="text-md" />
            Add Card
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Card</DialogTitle>
            <DialogDescription>
              Create a new Card here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form ref={formRef} className="w-full p-3 space-y-4 ">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                ref={titleRef}
                className="input input-bordered"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (descriptionRef.current) {
                      descriptionRef.current.focus();
                    }
                  }
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                ref={descriptionRef}
                className="input input-bordered"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                  }
                }}
              />
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Color</Label>
                <Select
                  onValueChange={(e: any) => {
                    setColor(e);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color: string, index) => (
                      <SelectItem key={index} value={color}>
                        <div
                          className={
                            "w-[200px] rounded-md mx-0 px-0 items-start pb-4 cursor-pointer " +
                            color
                          }
                        >
                          <div className="w-full">&nbsp;</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </LabelInputContainer>
            </LabelInputContainer>
          </form>
          <DialogFooter>
            <div className="flex flex-col w-full">
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                onClick={handleCreateCard}
              >
                Save
                <BottomGradient />
              </button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              <LabelInputContainer className="mb-4">
                <Label>
                  <span className="label-text-alt text-error">{error}</span>
                </Label>
              </LabelInputContainer>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
