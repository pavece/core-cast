import React from 'react';
import { Button } from './button';
import { Search } from 'lucide-react';
import { Input } from './input';
import { UserProfile } from '../user/user-profile';
import { cookies } from 'next/headers';
import { checkSession } from '@/api/coreApi';
import Link from 'next/link';
import { VideoSearch } from './video-search';

export const Navbar = async () => {
	let userProfile: { username: string } = { username: '' };

	try {
		const sessionCookie = await (await cookies()).get('session_token');
		if (sessionCookie) {
			const validationResult = await checkSession(sessionCookie?.value);
			userProfile = validationResult.data.user;
		}
	} catch {}

	return (
		<nav className='flex items-center justify-between p-4 gap-2 sticky top-0 z-50 bg-background'>
			<Link href='/'>
				<img src='/logo.svg' alt='Core cast logo' className='w-[130px] md:w-[170px]' />
			</Link>
			<div className='w-full justify-center hidden md:flex'>
				<VideoSearch />
			</div>
			<div className='flex items-center gap-2'>
				<Button className='md:hidden h-10' variant='secondary'>
					<Search /> Search video
				</Button>
				<UserProfile username={userProfile?.username} />
			</div>
		</nav>
	);
};
