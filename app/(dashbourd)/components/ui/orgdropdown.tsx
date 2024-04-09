"use client";
import React, { useEffect, useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image';
import { I_ApiOrganizationSelectRequest } from '@/app/api/account/organizationselect/route';
import { getUserSelectedOrgData } from '@/lib/client/auth';
import { Skeleton } from '@/components/ui/skeleton';

async function getOrganizationsList() {
    const response = await fetch('/api/account/organizations', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

	const data = await response.json();

    return  JSON.parse(JSON.stringify(data));
}

export function Orgdropdown() {

    // State
    const [error, setError] = useState('');
    const [ userSelectedOrg, setUserSelectedOrg ] = useState({ selectedOrg: '', selectedOrgRole: '' });
    const [ userSelectedOrgIndex, setUserSelectedOrgIndex ] = useState(0);
    const [ organizationsList, setOrganizationsList ] = useState([]);
    const [ isLoading, setIsLoading  ] = useState(false);
    
     useEffect(() => {
        setIsLoading(true);

        getOrganizationsList()
        .then((data) => {
            if(data) {
                setOrganizationsList(data);
            }
        })
        .catch(() => {
				console.error('Something went wrong!');
		})
		.finally(() => {
			setIsLoading(false);
		})
     },[]);

    
     useEffect(() => {
        const selectOrg = getUserSelectedOrgData();
        if(selectOrg) setUserSelectedOrg(selectOrg);

        setIsLoading(true);

        organizationsList.forEach((organization: any, index) => {
            if(organization.Organization.id === userSelectedOrg?.selectedOrg ) {
                setUserSelectedOrgIndex(index);

                setTimeout(() => {
                    setIsLoading(false);
                }, 100);
            }
        })
     },[organizationsList]);
    
     return (
    <>
    {!isLoading ? 
        <Select defaultValue={userSelectedOrgIndex + ''}>
            <SelectTrigger  className="w-[180px] h-[60px]" >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {organizationsList.map((organizationlist: any, index) => (
                   <SelectItem key={index} value={index +""} >
                   <div className="mb-4 grid grid-rows-1 grid-cols-[24px_1fr]  gap-x-5 items-start pb-4 last:mb-0 last:pb-0 cursor-pointer">
                    <Image src={organizationlist.Organization.avatar ? organizationlist.Organization.avatar : 'avatars/org/org1.svg'} alt='organization avatar' width={150} height={150} className='rounded-full border-1 border-solid border-black'/>
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {organizationlist.Organization.name}
                            </p>
                        </div>
                    </div>
                   </SelectItem> 
                ))}
            </SelectContent>
        </Select>: <>
                    <div className="flex items-center space-x-4 w-[180px] h-[60px]">
                        <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-4 w-[80px]" />
                            </div>
                    </div></>} </>
    );
}