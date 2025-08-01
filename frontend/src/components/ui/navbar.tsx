'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Search, X } from 'lucide-react';
import { UserProfile } from '../user/user-profile';
import Link from 'next/link';
import { VideoSearch } from './video-search';
import clsx from 'clsx';

type Props = {
	userProfile: {
		username: string | null;
	};
};

export const Navbar = ({ userProfile }: Props) => {
	const [mobileSearchEnabled, setMobileSearchEnabled] = useState(false);

	return (
		<nav className='flex items-center justify-between p-4 gap-2 sticky top-0 z-50 bg-background'>
			{!mobileSearchEnabled && (
				<Link href='/'>
					<img src='/logo.svg' alt='Core cast logo' className='w-[130px] md:w-[170px]' />
				</Link>
			)}

			<div className={clsx('w-full justify-center hidden md:flex', { '!flex': mobileSearchEnabled })}>
				<VideoSearch />
			</div>
			<div className='flex items-center gap-2'>
				<Button className='md:hidden h-10' variant='secondary' onClick={() => setMobileSearchEnabled(v => !v)}>
					{!mobileSearchEnabled ? (
						<>
							<Search /> Search
						</>
					) : (
						<X />
					)}
				</Button>
				<UserProfile username={userProfile?.username} />
			</div>
		</nav>
	);
};
