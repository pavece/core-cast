import { Button } from '@/components/ui/button';
import { DoorClosedLocked, Settings, Trash } from 'lucide-react';
import React from 'react';

export const RowActions = ({ userId }: { userId: string }) => {
	return (
		<div className='flex gap-2'>
			<Button disabled={!userId} variant='destructive'>
				<Trash /> Delete user
			</Button>
			<Button disabled={!userId} variant='destructive'>
				<DoorClosedLocked /> Close sessions
			</Button>
			<Button disabled={!userId}>
				<Settings /> Edit
			</Button>
		</div>
	);
};
