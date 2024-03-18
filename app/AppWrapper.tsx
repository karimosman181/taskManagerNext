'use client';

import React from 'react';

import { AppProvider } from '@/contexts/AppContext';


interface Props {
	children: React.ReactNode;
}

export default function AppWrapper(props: Props) {
	const { children } = props;
	return (
		<AppProvider>
			<div className="flex flex-col min-h-screen bg-base-100 text-base-content">
				{children}
			</div>
		</AppProvider>
	);
}