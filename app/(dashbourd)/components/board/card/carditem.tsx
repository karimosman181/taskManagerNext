"use client";
import { ElementRef, useEffect, useRef, useState } from "react";
import { I_CardPublic } from "@/models/Card.types";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


import { Draggable } from "@hello-pangea/dnd";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ListItemProps {
  data: I_CardPublic;
  index: number;
}

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

export const CardItem = ({ data, index }: ListItemProps) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const titleRef = useRef<ElementRef<"input">>(null);
  const descriptionRef = useRef<ElementRef<"input">>(null);
  const contentRef = useRef<ElementRef<"textarea">>(null);
  const [color, setColor] = useState(data.color);
  const [error, setError] = useState("");
  const [editing, setediting] = useState(false);

  const Icon = Icons["edit"];

  const MessageIcon = Icons["message"];

  useEffect(() => {
    setColor(data.color);
  }, [data]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(e) => {
          setOpen(!open);
          setediting(false);
        }}
      >
        <Draggable draggableId={data.id} index={index}>
          {(provided) => (
            <DialogTrigger asChild>
              <Card
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <CardHeader>
                  <CardTitle>{data.title}</CardTitle>
                  <CardDescription>{data.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row grow justify-between">
                    <div>
                      <Badge>Badge</Badge>
                    </div>
                    <div>
                      <div className="flex -space-x-2 *:ring *:ring-white">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={""} />
                          <AvatarFallback>
                            TT
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={""} />
                          <AvatarFallback>
                            TT
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={""} />
                          <AvatarFallback>
                            TT
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t-2 border-solid border-gray-200 pt-4">
                  <div className="flex flex-wrap gap-x-2">
                    <MessageIcon />
                    <span className="text-gray-400">0</span>
                  </div>
                </CardFooter>
              </Card>
            </DialogTrigger>
          )}
        </Draggable>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
            <DialogDescription>
              Edit card here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form ref={formRef} className="w-full p-3 space-y-4">
            <div className=" flex flex-column gap-x-8">
              <div className="basis-[70%]">
                {editing ? (
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      className="min-h-[200px] w-full"
                      placeholder="Type the card content here."
                      id="content"
                      value={data && data.content ? data.content : ""}
                      ref={contentRef}
                    />
                    <p className="text-sm text-muted-foreground">
                      leave empty if there is no content
                    </p>
                  </div>
                ) : (
                  <div>
                    <Label
                      htmlFor="content"
                      className="flex flex-wrap gap-4 w-full"
                    >
                      <span className="block w-3/4">Content</span>
                      <Icon
                        className="h-4 w-4"
                        onClick={(e) => {
                          setediting(true);
                        }}
                      />
                    </Label>
                    <div>{data && data.content ? data.content : ""}</div>
                  </div>
                )}
              </div>
              <div className="basis-[30%]">
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    ref={titleRef}
                    value={data.title}
                    disabled={!editing}
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
                    disabled={!editing}
                    value={data.description}
                    className="input input-bordered"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                      }
                    }}
                  />
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Color</Label>
                    <Select
                      disabled={!editing}
                      onValueChange={(e: any) => {
                        setColor(e);
                      }}
                      defaultValue={color}
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
              </div>
            </div>
            <div className="grid w-full gap-1.5">
              <Label>Members</Label>
              <div className="flex flex-wrap gap-2">
                <div></div>
                {editing ? (
                  <div>
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-black text-xl">
                        +
                      </span>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
          <DialogFooter>
            <div className="flex flex-col w-full">
              {editing ? (
                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                // onClick={handleCreateCard}
                >
                  Save
                  <BottomGradient />
                </button>
              ) : (
                ""
              )}
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
