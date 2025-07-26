import { checkSession, closeSession } from '@/api/coreApi';
import { UserProfile } from '@/components/user/user-profile';
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
			<main className='p-4'>
				<nav className='flex justify-between'>
					<img src='/logo.svg' alt='Core cast logo' className='w-[140px] md:w-[160px]' />
					<UserProfile username={validationResult.data.user.username} />
				</nav>
				{children}
			</main>
		);
	} catch {
		return redirect('/');
	}
}
