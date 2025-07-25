import type { Metadata } from 'next';
import '../globals.css';
import { Navbar } from '@/components/ui/navbar';

export const metadata: Metadata = {
	title: 'Core Cast',
	description: 'The VOD distribution platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar />
			<main className='p-4'>{children}</main>
		</>
	);
}
