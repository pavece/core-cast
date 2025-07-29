'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarUserProfile } from '@/components/user/sidebar-user-profile';
import { LayoutList, Plus, Settings, Users } from 'lucide-react';
import { AddUserModal } from '../admin/add-user-modal';
import Link from 'next/link';

type Props = {
	username: string;
	role: 'ADMIN' | 'USER';
};

export const LayoutSidebar = ({ username, role }: Props) => {
	return (
		<Sidebar variant='floating'>
			<SidebarHeader className='flex items-start'>
				<img src='/logo.svg' alt='Core cast logo' className='w-[140px] md:w-[160px]' />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Channel & User</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton className='cursor-pointer' asChild>
									<Link href='/creator-pannel/settings'>
										<Settings /> Settings
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Videos</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton className='cursor-pointer' asChild>
									<Link href='/creator-pannel/create'>
										<Plus /> Create video
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton className='cursor-pointer'>
									<LayoutList /> Manage videos
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{role == 'ADMIN' && (
					<SidebarGroup>
						<SidebarGroupLabel>Administration</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<AddUserModal>
										<SidebarMenuButton className='cursor-pointer'>
											<Plus /> Add user
										</SidebarMenuButton>
									</AddUserModal>
								</SidebarMenuItem>
							</SidebarMenu>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton className='cursor-pointer' asChild>
										<Link href='/admin/users'>
											<Users /> Manage users
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				)}
			</SidebarContent>

			<SidebarFooter>
				<SidebarUserProfile username={username} role={role} />
			</SidebarFooter>
		</Sidebar>
	);
};
