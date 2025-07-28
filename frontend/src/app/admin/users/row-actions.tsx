'use client';

import { adminCloseUserSessions, adminToggleUserBan } from '@/api/coreApi';
import { handleApiError } from '@/api/errors';
import { Button } from '@/components/ui/button';
import { DestructiveAction } from '@/components/ui/destructive-action';
import { Crosshair, DoorClosedLocked, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

async function onCloseSessions(userId: string) {
	try {
		await adminCloseUserSessions(userId);
		toast.success('User sessions closed');
	} catch (error) {
		handleApiError(error);
	}
}

async function onBanUser(userId: string) {
	try {
		const { data } = await adminToggleUserBan(userId);
		toast.success(`User sucessfully ${data.user.banned ? 'banned' : 'unbanned'}`);
	} catch (error) {
		handleApiError(error);
	}
}

export const RowActions = ({ userId }: { userId: string }) => {
	const router = useRouter();

	return (
		<div className='flex gap-2'>
			<Button disabled={!userId} variant='destructive' onClick={() => onBanUser(userId)}>
				<Crosshair /> Ban / unban
			</Button>
			<DestructiveAction action={() => onCloseSessions(userId)}>
				<Button disabled={!userId} variant='destructive'>
					<DoorClosedLocked /> Close sessions
				</Button>
			</DestructiveAction>
			<Button disabled={!userId} onClick={() => router.push(`/admin/users/${userId}`)}>
				<Settings /> Edit
			</Button>
		</div>
	);
};
