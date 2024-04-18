"use client";

import { Plus } from "lucide-react";
import { ListWrapper } from "./listwrapper";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const formRef = useRef<ElementRef<"form">>(null);
  const titleRef = useRef<ElementRef<"input">>(null);
  const descriptionRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [color, setColor] = useState(null);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  // useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
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

          <button
            className="bg-gradient-to-br relative group/btn from-white dark:from-zinc-900 dark:to-zinc-900 to-stone-600 block dark:bg-zinc-800 w-full text-dark rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            // onClick={handleCreateOrganization}
          >
            Cancel
            <BottomGradient />
          </button>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            // onClick={handleCreateOrganization}
          >
            Submit
            <BottomGradient />
          </button>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full bg-white/80 hover:bg-white/50 hover:shadow-md transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
      {/* <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"></form> */}
    </ListWrapper>
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
