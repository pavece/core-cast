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
import { EllipsisVertical, User } from 'lucide-react';
import { closeSession } from '@/api/coreApi';
import { useRouter } from 'next/navigation';

type Props = {
	username: string;
	role: string;
};

export const SidebarUserProfile = ({ username, role }: Props) => {
	const router = useRouter();

	const onCloseSession = async () => {
		await closeSession();
		window.sessionStorage.clear();

		router.push('/');
	};

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger className='cursor-pointer w-full'>
					<div className='flex justify-between w-full'>
						<div className='flex items-center gap-2'>
							<Avatar className='rounded-md w-11 h-11'>
								<AvatarImage src={``} className='rounded-none'></AvatarImage>
								<AvatarFallback className='rounded-none'>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
							<div className='text-start'>
								<h4 className='text-md font-medium'>{username}</h4>
								<p className='text-sm text-muted-foreground capitalize'>{role.toLowerCase()}</p>
							</div>
						</div>
						<div className='flex items-center justify-center'>
							<EllipsisVertical />
						</div>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='mb-2'>
					<DropdownMenuLabel className='flex items-center gap-1'>
						<User className='w-4' /> Account
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
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
	);
};
