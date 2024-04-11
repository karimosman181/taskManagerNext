"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useApp } from '@/contexts/AppContext';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Profiledropdown() {

    
  	const { userData, loadUserData, isLoading, setIsLoading } = useApp();

    // State
    const [error, setError] = useState('');

         return (
    <>
    {!isLoading ?
    userData ? <div className="flex flex-wrap flex-row items-center gap-3">
        <div>
            <Avatar>
                <AvatarImage src={ userData!.avatar } />
                <AvatarFallback> {userData!.firstName.slice(0,1) + "" + userData!.lastName.slice(0,1)}</AvatarFallback>
            </Avatar>
        </div>
        <div>  { userData!.firstName + " " + userData!.lastName }</div>
        </div> : "" :<>
    <div className="flex items-center space-x-4 w-[180px] h-[60px]">
                        <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-4 w-[80px]" />
                            </div>
                    </div></>}</>);
}