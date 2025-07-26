'use client';

import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useSession } from '@/hooks/use-session';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

export const UserProfile = () => {
	const { userSession, logout } = useSession();

	async function onCloseSession() {
		await logout();
		window.location.reload();
	}

	return (
		<>
			{userSession ? (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger className='cursor-pointer'>
							<Avatar className='w-11 h-11'>
								<AvatarImage src={``}></AvatarImage>
								<AvatarFallback>{userSession.username.slice(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='mr-4 mt-2'>
							<DropdownMenuLabel className='flex items-center gap-1'>
								<User className='w-4' /> Account
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href='/creator-pannel'>Creator pannel</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href='/auth/settings'>Settings</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className='cursor-pointer' onClick={onCloseSession}>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			) : (
				<Button asChild>
					<Link href='/auth/login'>
						<User />
						Login
					</Link>
				</Button>
			)}
		</>
	);
};
