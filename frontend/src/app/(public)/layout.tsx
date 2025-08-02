import type { Metadata } from 'next';
import '../globals.css';
import { Navbar } from '@/components/ui/navbar';
import { cookies } from 'next/headers';
import { checkSession } from '@/api/coreApi';

export const metadata: Metadata = {
	title: 'Core Cast',
	description: 'The VOD distribution platform',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	let userProfile: { username: string | null } = { username: null };

	try {
		const sessionCookie = await (await cookies()).get('session_token');
		if (sessionCookie) {
			const validationResult = await checkSession(sessionCookie?.value);
			userProfile = validationResult.data.user;
		}
	} catch {}

	return (
		<>
			<Navbar userProfile={userProfile} />
			<main className='p-4 w-full flex justify-center'>
				<div className='w-full max-w-[1800px]'>{children}</div>
			</main>
		</>
	);
}
