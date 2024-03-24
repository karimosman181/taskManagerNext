"use client";
import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'; 

import { I_ApiUserLoginRequest, I_ApiUserLoginResponse } from '../api/auth/login/route';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

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

			const response = await fetch('/api/auth/login', {
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
					router.push('/app');
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
	<div className='w-full h-full flex flex-wrap content-center min-h-screen'>
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        
      </p>

      <div className="my-8">
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

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={handleLogin}
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <LabelInputContainer className="mb-4">
          <Label><span className="label-text-alt text-error">{error}</span></Label>
        </LabelInputContainer>
      </div>
    </div>
	</div>
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
