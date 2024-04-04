"use client";
import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation'; 

import { I_ApiUserLoginRequest, I_ApiUserLoginResponse } from '@/app/auth/login/route';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginForm() {
  	const { userData, loadUserData, isLoading, setIsLoading } = useApp();
	const router = useRouter();

	// Utils
	const searchParams = useSearchParams();
	const redirect = searchParams.get('redirect');

	// Refs
	const loginRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// State
	const [error, setError] = useState('');
	const [loginIsComplete, setLoginIsComplete] = useState(false);

	// Handlers
	const handleLogin = async () => {
		if (isLoading) return;

		setIsLoading(true);
		setError('');
		try {
			if (!loginRef.current?.value || !passwordRef.current?.value)
				throw new Error('Please enter your credentials.');

			const payload: I_ApiUserLoginRequest = {
				login: loginRef.current?.value,
				password: passwordRef.current?.value,
			};

			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const data: I_ApiUserLoginResponse = await response.json();

			if (data.success) {
				setLoginIsComplete(true);
				loadUserData();
				if (redirect) {
					router.push(redirect);
				} else {
					router.push('/dashbourd');
				}
				return;
			}

			throw new Error(data.message);
		} catch (error) {
			console.log(error);
			let mess = 'Something went wrong.';
			if (error instanceof Error) {
				mess = error.message;
			}
			setError(mess);
		} finally {
			setIsLoading(false);
		}
	};

  return (
	<Card>
		<CardHeader>
			<CardTitle>Welcome Back</CardTitle>
            <CardDescription></CardDescription>
	  </CardHeader>

      <CardContent>
		<div className="grid w-full md:w-[22rem] items-center gap-4">
		 <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input defaultValue="john@example.com"
				type="text"
				ref={loginRef}
				className="input input-bordered"
				onKeyDown={e => {
				if (e.key === 'Enter') {
					if (passwordRef.current) {
                        passwordRef.current.focus();				
                    }				
                }}} />
        </LabelInputContainer>
		<LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input 
            defaultValue="12345"
			type="password"
			ref={passwordRef}
			className="input input-bordered"
			onKeyDown={e => {
			    	if (e.key === 'Enter') {
						handleLogin();
					}
			}} />
        </LabelInputContainer>

		</div>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={handleLogin}
        >
          Login &rarr;
          <BottomGradient />
        </button>
	</CardContent>	
	  <CardFooter>  
          <div className='w-full'>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <LabelInputContainer className="mb-4">
              <Label><span className="label-text-alt text-error">{error}</span></Label>
            </LabelInputContainer>
          </div>
        </CardFooter>
    </Card>
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
