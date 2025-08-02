import { Button } from '@/components/ui/button';
import { House } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const NotFound = () => {
	return (
		<div className='flex items-center w-full h-[600px] flex-col justify-center'>
			<h1 className='text-7xl font-bold'>404</h1>
			<h3 className='text-2xl mt-2 text-muted-foreground'>This page does not exist</h3>
			<Button asChild className='mt-6'>
				<Link href='/'>
					<House /> Go Home
				</Link>
			</Button>
		</div>
	);
};

export default NotFound;
