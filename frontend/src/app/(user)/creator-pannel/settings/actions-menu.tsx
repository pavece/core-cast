import { closeAllSessions, deleteAccount } from '@/api/coreApi';
import { Button } from '@/components/ui/button';
import { DoorClosedLocked, Lock, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

type Props = {
	otpEnabled: boolean;
};

export const ActionsMenu = ({ otpEnabled }: Props) => {
	const router = useRouter();

	async function onCloseSessions() {
		await closeAllSessions();
		router.replace('/auth/login');
		toast.info('Sessions closed');
	}

	async function onDeleteAccount() {
		await deleteAccount();
		router.replace('/');
	}

	return (
		<div className='w-full'>
			<h3 className='text-md font-medium mt-4'>Other actions</h3>
			{!otpEnabled && (
				<Link href='/auth/setup-2fa'>
					<Button className='w-full mt-2'>
						<Lock /> Setup 2FA
					</Button>
				</Link>
			)}

			<div className='flex items-center w-full flex-col lg:flex-row gap-2 mt-2'>
				{/* TODO: Add confirmation dialog */}
				<Button variant='destructive' className='flex-1 w-full' onClick={onDeleteAccount}>
					<Trash /> Delete account
				</Button>
				<Button variant='destructive' className='flex-1 w-full' onClick={onCloseSessions}>
					<DoorClosedLocked /> Close active sessions
				</Button>
			</div>
		</div>
	);
};
