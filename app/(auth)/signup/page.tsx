"use client";
import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'

import { I_ApiUserSignupRequest, I_ApiUserSignupResponse} from '@/auth/signup/route';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SignupForm() {
     const { userData, loadUserData, isLoading, setIsLoading } = useApp();
	const router = useRouter();

	// Utils
	const searchParams = useSearchParams();
	const redirect = searchParams.get('redirect');

	// Refs
	const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// State
	const [error, setError] = useState('');
	const [signupIsComplete, setSignupIsComplete] = useState(false);

    // Handlers
	const handleSignup = async () => {
      if (isLoading) return;

		  setIsLoading(true);
		  setError('');

      try {
        if (!firstNameRef.current?.value || !lastNameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value)
				  throw new Error('Please enter your credentials.');

        if(passwordRef.current?.value.length < 8) {
          throw new Error('Weak Password !!!');
        }

        const payload: I_ApiUserSignupRequest = {
				  firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
          email: emailRef.current?.value,
				  password: passwordRef.current?.value,
			  };
      
        const response = await fetch('/auth/signup', {
			    method: 'POST',
				  headers: {
					  'Content-Type': 'application/json',
				  },
				  body: JSON.stringify(payload),
			  });

        const data: I_ApiUserSignupResponse = await response.json();

			  if (data.success) {
				  setSignupIsComplete(true);
				  loadUserData();
				  if (redirect) {
					  router.push(redirect);
				  } else {
					  router.push('/app');
				  }
				  return;
			  }

			  throw new Error(data.message);
      }catch (error) {
			console.error(error);
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
      //  <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <Card>
          <CardHeader>
            <CardTitle>Welcome to TaskMaster</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
 
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Tyler" 
                  type="text"
          ref={firstNameRef}
          className="input input-bordered"
          onKeyDown={e => {
          if (e.key === 'Enter') {
            if (lastNameRef.current) {
                          lastNameRef.current.focus();				
                      }				
                  }}} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Durden"
          type="text"
          ref={lastNameRef}
          className="input input-bordered"
          onKeyDown={e => {
          if (e.key === 'Enter') {
            if (emailRef.current) {
                          emailRef.current.focus();				
                      }				
                  }}}/>
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input placeholder="john@example.com"
          type="email"
          ref={emailRef}
          className="input input-bordered"
          onKeyDown={e => {
          if (e.key === 'Enter') {
            if (passwordRef.current) {
                          passwordRef.current.focus();				
                      }				
                  }}}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input placeholder="••••••••"
        type="password"
        ref={passwordRef}
        className="input input-bordered"
        onKeyDown={e => {
              if (e.key === 'Enter') {
              handleSignup();
            }
        }} /> 
          </LabelInputContainer>
          <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              onClick={handleSignup}
            >
              Sign up &rarr;
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
    // {/* </div> */}
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