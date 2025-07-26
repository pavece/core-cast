import { checkSession, closeSession } from '@/api/coreApi';
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
	SidebarProvider,
} from '@/components/ui/sidebar';
import { SidebarUserProfile } from '@/components/user/sidebar-user-profile';
import { LayoutList, Plus, Settings } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function CreatorPannelLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	try {
		const sessionCookie = await (await cookies()).get('session_token');
		if (!sessionCookie?.value) redirect('/');

		const validationResult = await checkSession(sessionCookie.value);

		if (!validationResult.data.user.username) return redirect('/');

		return (
			<SidebarProvider>
				<Sidebar variant='floating'>
					<SidebarHeader className='flex items-center'>
						<img src='/logo.svg' alt='Core cast logo' className='w-[140px] md:w-[160px]' />
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Channel & User</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton className='cursor-pointer'>
											<Settings /> Settings
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
										<SidebarMenuButton className='cursor-pointer'>
											<Plus /> Create video
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
					</SidebarContent>

					<SidebarFooter>
						<SidebarUserProfile username={validationResult.data.user.username} role={validationResult.data.user.role} />
					</SidebarFooter>
				</Sidebar>
				<main className='p-4'>
					<div>{children}</div>
				</main>
			</SidebarProvider>
		);
	} catch {
		return redirect('/');
	}
}
