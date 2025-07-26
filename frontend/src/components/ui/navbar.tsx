import React from 'react';
import { Button } from './button';
import { Search, User } from 'lucide-react';
import { Input } from './input';
import { UserProfile } from '../user/user-profile';

export const Navbar = () => {
	return (
		<nav className='flex items-center justify-between p-4 gap-2'>
			<img src='/logo.svg' alt='Core cast logo' className='w-[140px] w-[160px]' />
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
				<UserProfile />
			</div>
		</nav>
	);
};
