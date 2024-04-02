"use client";
import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'; 
import { cn } from '@/lib/utils';
import { I_ApiOrganizationCreateRequest, I_ApiOrganizationCreateResponse } from '@/app/api/account/organizations/route';
import { Skeleton } from '@/components/ui/skeleton';
import { I_ApiOrganizationSelectRequest } from '@/app/api/account/organizationselect/route';

const organizationAvatars = [
    'avatars/org/org1.svg',
    'avatars/org/org2.svg',
    'avatars/org/org3.svg',
    'avatars/org/org4.svg',
];

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

export default function ChooseOrgPage() {

    const router = useRouter();

    // Refs
	const nameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

    // State
	const [error, setError] = useState('');
    const [ organizationsList, setOrganizationsList ] = useState([]);
    const [ organizationsCreate, setOrganizationsCreate ] = useState(false);
    const [ isLoading, setIsLoading  ] = useState(false);
    const [ avatar , setAvatar ] = useState(null);

     useEffect(() => {
        setIsLoading(true);

        if(!organizationsCreate){
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
		})}else{setIsLoading(false);}
     },[organizationsCreate]);

     // Handlers
	const handleSelectOrganization = async (org_id: string, role: string) => {
		if (isLoading) return;

		setIsLoading(true);
		setError('');
		try {
            if (!org_id || !role )
				throw new Error('error happened !');

			const payload: I_ApiOrganizationSelectRequest = {
                selectedOrg: org_id,
                selectedOrgRole: role,
			};
            
            const response = await fetch('/api/account/organizationselect', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const data: I_ApiOrganizationCreateResponse = await response.json();


            if (data.success) {
                setOrganizationsCreate(false);
                // Redirect to app dashboard	
                router.push('/app')
				
				return;
			}

			throw new Error(data.message);

        } catch (error) {
			let mess = 'Something went wrong.';
			if (error instanceof Error) {
				mess = error.message;
			}
			setError(mess);
		} finally {
			setIsLoading(false);
		}
    }

    const handleCreateOrganization = async () => {
        if (isLoading) return;

		setIsLoading(true);
		setError('');
		try {

            if (!avatar || !nameRef.current?.value || !descriptionRef.current?.value)
				throw new Error('Please enter all required fields.');

			const payload: I_ApiOrganizationCreateRequest = {
				name: nameRef.current?.value,
				description: descriptionRef.current?.value,
                avatar: avatar
			};
            
            const response = await fetch('/api/account/organizations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const data: I_ApiOrganizationCreateResponse = await response.json();


            if (data.success) {
                setOrganizationsCreate(false);
				return;
			}

			throw new Error(data.message);

        } catch (error) {
			let mess = 'Something went wrong.';
			if (error instanceof Error) {
				mess = error.message;
			}
			setError(mess);
		} finally {
			setIsLoading(false);
		}
    }
     
    return (
        <>
            <Card>
                { !organizationsCreate  ? <> 
                <CardHeader>
			        <CardTitle>Select an organization</CardTitle>
                    <CardDescription>to continue to taskMaster</CardDescription>
	            </CardHeader>
                <CardContent>
                    {isLoading ? <>
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                    </div></> : <>
                            <div>
                    {organizationsList.map((organizationlist: any, index) => (
                        <a
                        key={index}
                        className="mb-4 grid grid-rows-1 grid-cols-[36px_1fr_25px]  gap-x-5 items-start pb-4 last:mb-0 last:pb-0 cursor-pointer"
                        onClick={ e => { handleSelectOrganization(organizationlist.Organization.id, organizationlist.role) }}
                        >
                        <Image src={organizationlist.Organization.avatar ? organizationlist.Organization.avatar : 'avatars/org/org1.svg'} alt='organization avatar' width={150} height={150} className='rounded-full border-1 border-solid border-black'/>
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {organizationlist.Organization.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {organizationlist.Organization.description}
                            </p>
                        </div>
                        <div>
                             &rarr;
                        </div>
                        </a>
                    ))}
                </div>
                    </>}
                
                </CardContent>
                <CardFooter>  
                    <div className='w-full'>
                        <div className='w-full flex flex-wrap flex-row justify-center'>                 
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-1/3" />
                            <span className='self-center align-center text-neutral-400 dark:text-neutral-700'>OR</span>
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-1/3" />
                        </div>
                        <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit" onClick={ e => {
                                setOrganizationsCreate(true);
                            }}>
                            Create New Organization &rarr;
                            <BottomGradient />
                        </button>
                    </div>
                </CardFooter>
                </>: <>
                 <CardHeader>
                    <a className='cursor-pointer' onClick={ e => { setOrganizationsCreate(false); }}>&larr; Go Back</a>
			        <CardTitle> Create an organization</CardTitle>
                    <CardDescription>in taskMaster</CardDescription>
	            </CardHeader>
                <CardContent>
                        <div className="grid w-full md:w-[22rem] items-center gap-4">
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Avatar</Label>
                                <Select onValueChange={ (e: any) => { setAvatar(e) }} >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Avatar"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {organizationAvatars.map((organizationAvatar: string, index) => (
                                            <SelectItem key={index} value={organizationAvatar}> 
                                                <div className='className="mb-4 grid grid-rows-1 grid-cols-[36px_1fr]  gap-x-5 items-start pb-4 last:mb-0 last:pb-0 cursor-pointer"'>
                                                    <Image src={organizationAvatar} alt='organization avatar' width={25} height={25} className='rounded-full border-1 border-solid border-black'/>
                                                    <div>Avatar {index + 1}</div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </LabelInputContainer>
		                    <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Name</Label>
                                <Input type="text"
				                        ref={nameRef}
				                        className="input input-bordered"
				                        onKeyDown={e => {
				                            if (e.key === 'Enter') {
					                            if (descriptionRef.current) {
                                                    descriptionRef.current.focus();				
                                                }				
                                }}} />
                            </LabelInputContainer>
		                    <LabelInputContainer className="mb-4">
                                <Label htmlFor="password">Description</Label>
                                <Input type="text"
			                            ref={descriptionRef}
			                            className="input input-bordered"
			                            onKeyDown={e => {
			    	                            if (e.key === 'Enter') {
                                                    handleCreateOrganization
					                            }
			                            }} />
                            </LabelInputContainer>

		                </div>
                    </CardContent>
                    <CardFooter>  
                        <div className='w-full'>
                            <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit" onClick={handleCreateOrganization}>
                                Submit
                                <BottomGradient />
                            </button>
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                            <LabelInputContainer className="mb-4">
                                <Label><span className="label-text-alt text-error">{error}</span></Label>
                            </LabelInputContainer>
                        </div>
                    </CardFooter>
                </>}
            </Card>
        </>
    );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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