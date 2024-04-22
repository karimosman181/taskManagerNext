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
  I_ApiListCreateRequest,
  I_ApiListCreateResponse,
} from "@/app/api/account/organizations/lists/route";

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

export const ListForm = () => {
  const router = useRouter();

  const formRef = useRef<ElementRef<"form">>(null);
  const titleRef = useRef<ElementRef<"input">>(null);
  const descriptionRef = useRef<ElementRef<"input">>(null);
  const [color, setColor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const handleCreateList = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError("");
    try {
      if (!color || !titleRef.current?.value || !descriptionRef.current?.value)
        throw new Error("Please enter all required fields.");

      const payload: I_ApiListCreateRequest = {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        color: color,
      };

      const response = await fetch("/api/account/organizations/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: I_ApiListCreateResponse = await response.json();

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
        router.refresh();
      }, 10000);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            // onClick={enableEditing}
            className="shrink-0 h-[50px] w-[160px] fixed bottom-4 right-4 select-none bg-blue-600/80  text-white rounded-3xl hover:shadow-md transition p-3 flex items-center font-medium text-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add new list
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create List</DialogTitle>
            <DialogDescription>
              Create a new list here. Click save when you're done.
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
                onClick={handleCreateList}
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
