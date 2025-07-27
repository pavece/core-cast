import { checkSession } from '@/api/coreApi';
import { LayoutSidebar } from '@/components/ui/layout-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

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

		if (!validationResult.data.user.username || validationResult.data.user.role !== 'ADMIN') return redirect('/');

		return (
			<SidebarProvider>
				<LayoutSidebar username={validationResult.data.user.username} role={validationResult.data.user.role} />

				<main className='p-4 w-full'>
					<div>{children}</div>
				</main>
			</SidebarProvider>
		);
	} catch {
		return redirect('/');
	}
}
