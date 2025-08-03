import { Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
	return (
		<footer className='border-t flex  justify-center p-8 mt-8'>
			<div className='max-w-[1440px] w-full'>
				<img src='/logo.svg' className='w-[140px] md:w-[160px]' />
				<div className='flex gap-4 items-center mt-4'>
					<Link href='https://github.com/pavece/core-cast' className='flex text-muted-foreground gap-1'>
						<Github className='w-6' /> GitHub
					</Link>
					<span className='text-muted-foreground'>|</span>
					<p className='text-muted-foreground'>
						Built by{' '}
						<Link className='underline' href='https://pavece.com'>
							Pavece
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
};
