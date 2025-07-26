import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ReactQueryProvider } from '@/providers/react-query';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

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
		<html lang='en' className='dark'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ReactQueryProvider>
					<Toaster position='top-right' richColors theme='dark' />
					{children}
				</ReactQueryProvider>
			</body>
		</html>
	);
}
