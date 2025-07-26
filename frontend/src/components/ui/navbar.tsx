import React from 'react';
import { Button } from './button';
import { Search } from 'lucide-react';
import { Input } from './input';
import { UserProfile } from '../user/user-profile';
import { cookies } from 'next/headers';
import { checkSession } from '@/api/coreApi';

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
		<nav className='flex items-center justify-between p-4 gap-2'>
			<img src='/logo.svg' alt='Core cast logo' className='w-[140px] md:w-[160px]' />
			<div className='w-full justify-center hidden md:flex'>
				<div className='flex w-full max-w-[550px]'>
					<Input placeholder='Search videos' className='w-full rounded-tr-none rounded-br-none h-10' />
					<Button className='border rounded-tl-none rounded-bl-none border-l-0 w-[10%] h-10' variant='secondary'>
						<Search />
					</Button>
				</div>
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
