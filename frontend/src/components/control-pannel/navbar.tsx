import React from 'react';

import Link from 'next/link';
import { SidebarTrigger } from '../ui/sidebar';

export const CreatorPannelNavbar = () => {
	return (
		<nav className='flex items-center justify-between  w-full mb-6 md:hidden'>
			<Link href='/'>
				<img src='/logo.svg' alt='Core cast logo' className='w-[130px] md:w-[170px]' />
			</Link>
			<div className='bg-card border rounded-md p-1'>
				<SidebarTrigger />
			</div>
		</nav>
	);
};
