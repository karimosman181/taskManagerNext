"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";

import { getUserSelectedOrgData } from '@/lib/client/auth';
import { Skeleton } from '@/components/ui/skeleton';
import AvatarsGroup from './ui/avatarsgroup';

export function TopBar() {
     // State
    const [error, setError] = useState('');
    const [ userSelectedOrg, setUserSelectedOrg ] = useState({ selectedOrg: '', selectedOrgRole: '' });
    const [ userSelectedOrgLoaded, setUserSelectedOrgLoaded ] = useState(false);
    const [ isLoading, setIsLoading  ] = useState(false);
    
    
    useEffect(() => {
        setIsLoading(true);

        const selectOrg = getUserSelectedOrgData();
        if(selectOrg) setUserSelectedOrg(selectOrg);


         setTimeout(() => {
            setIsLoading(false);
        }, 100);
    },[]);

    return (
        <>
{!isLoading ? <>
<div className='flex flex-wrap justify-between w-full px-5 py-6'>
<div>
<h1 className='text-2xl font-semibold'>Organization Name</h1> 
<p className='text-sm text-gray-500 '>Oragnization Descriprion</p>
</div>
<div className='flex flex-wrap gap-2'>
<div>
<AvatarsGroup />
</div>
<div>
    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"><span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-black text-xl">+</span></span>
</div>
</div>
</div>
</>:<div className="flex items-center space-x-4 w-[180px] h-[60px]">
                        <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-4 w-[80px]" />
                            </div>
                    </div> }
        </>
    );
}