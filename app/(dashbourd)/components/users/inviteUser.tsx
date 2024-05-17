"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ElementRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";



export const InviteUser = () => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const emailRef = useRef<ElementRef<"input">>(null);

    const handleInviteUser = async () => {
        if (isLoading) return;

        setIsLoading(true);
        setError("");

        try {
            if (!emailRef.current?.value)
                throw new Error("Please enter all required fields.");


        } catch (error) {
            let mess = "Something went wrong.";
            if (error instanceof Error) {
                mess = error.message;
            }
            setError(mess);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(e) => {
                setOpen(!open);
            }}
        >
            <DialogTrigger asChild>
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full cursor-pointer">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-black text-xl">
                        +
                    </span>
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite User</DialogTitle>
                    <DialogDescription>
                        Enter User Email here. Click invite when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form ref={formRef} className="w-full p-3 space-y-4">
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="title">Email</Label>
                        <Input
                            id="title"
                            type="text"
                            ref={emailRef}
                            className="input input-bordered"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleInviteUser();
                                }
                            }}
                        />
                    </LabelInputContainer>
                </form>
                <DialogFooter>
                    <div className="flex flex-col w-full">

                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                            onClick={handleInviteUser}
                        >
                            Invite
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
    );
}

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