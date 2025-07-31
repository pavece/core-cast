'use client';

import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
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
import { closeSession } from '@/api/coreApi';
import { useRouter } from 'next/navigation';

type Props = {
	username: string | null;
};

export const UserProfile = ({ username }: Props) => {
	const router = useRouter();

	const onCloseSession = async () => {
		await closeSession();
		window.sessionStorage.clear();

		router.push('/');
	};

	return (
		<>
			{username?.length ? (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger className='cursor-pointer'>
							<Avatar className='w-11 h-11'>
								<AvatarImage src={``}></AvatarImage>
								<AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='mr-4 mt-2'>
							<DropdownMenuLabel className='flex items-center gap-1'>
								<User className='w-4' /> Account
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href='/creator-pannel/uploads'>Creator pannel</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href='/creator-pannel/settings'>Settings</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className='cursor-pointer text-red-400 hover:text-red-500 hover:bg-red-400/25'
								onClick={onCloseSession}
							>
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
