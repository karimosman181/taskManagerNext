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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation'; 

 
const organizations = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
    avatar: 'avatars/org/org1.svg',
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
    avatar: 'avatars/org/org2.svg',
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
    avatar: 'avatars/org/org3.svg',
  },
]

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
    
  	const { userData, loadUserData, isLoading, setIsLoading } = useApp();
    const router = useRouter();

    // State
	const [error, setError] = useState('');
    const [ organizationsList, setOrganizationsList ] = useState([]);
    const [ organizationsCreate, setOrganizationsCreate ] = useState(false);

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
		});
     },[]);

     // Handlers
	const handleSelectOrganization = async (org_id: string, role: string) => {
		if (isLoading) return;

		setIsLoading(true);
		setError('');
		try {

            console.log(org_id);
             console.log(role);
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
                </CardContent>
                <CardFooter>  
                    <div className='w-full'>
                        <div className='w-full flex flex-wrap flex-row justify-center'>                 
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-1/3" />
                            <span className='self-center align-center text-neutral-400 dark:text-neutral-700'>OR</span>
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-1/3" />
                        </div>
                        <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit" >
                            Create New Organization &rarr;
                            <BottomGradient />
                        </button>
                    </div>
                </CardFooter>
                </>: <>
                 <CardHeader>
			        <CardTitle>Create an organization</CardTitle>
                    <CardDescription>in taskMaster</CardDescription>
	            </CardHeader>
                <CardContent>

                </CardContent>
                <CardFooter>  
                    <div className='w-full'>
                        <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit" >
                            Submit
                            <BottomGradient />
                        </button>
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
