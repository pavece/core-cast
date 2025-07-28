'use client';

import { adminDeleteAccount } from '@/api/coreApi';
import { handleApiError } from '@/api/errors';
import { Button } from '@/components/ui/button';
import { DestructiveAction } from '@/components/ui/destructive-action';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

type Props = {
	userId: string;
};

export const ActionsMenu = ({ userId }: Props) => {
	const router = useRouter();

	async function onDeleteAccount() {
		try {
			await adminDeleteAccount(userId);
			toast.success('User account deleted');
			router.push('/admin/users');
		} catch (error) {
			handleApiError(error);
		}
	}

	return (
		<div>
			<h3 className='text-md font-medium mt-4 mb-2'>Other actions</h3>

			<DestructiveAction action={onDeleteAccount}>
				<Button variant='destructive' className='flex-1 w-full'>
					<Trash /> Delete account
				</Button>
			</DestructiveAction>
		</div>
	);
};
