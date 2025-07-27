'use client';

import React, { useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { adminGenerateWhitelistEntry } from '@/api/coreApi';
import { handleApiError } from '@/api/errors';
import Link from 'next/link';

type Props = { children: React.ReactNode };

export const AddUserModal = ({ children }: Props) => {
	const [whitelistId, setWhitelistId] = useState('');

	async function onCreateWhitelistLink() {
		try {
			const { data } = await adminGenerateWhitelistEntry();
			setWhitelistId(data.whitelistId);
		} catch (error) {
			handleApiError(error);
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild onClick={onCreateWhitelistLink}>
				{children}
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Add new user</AlertDialogTitle>
					<AlertDialogDescription>Create new whitelist link and send it to the end user.</AlertDialogDescription>
					<div>
						<Link className='text-blue-500' href={`/auth/register/${whitelistId}`}>
							{whitelistId && <p>/auth/register/{whitelistId}</p>}
						</Link>
						<p className='text-sm italic text-muted-foreground'>Copy this link, you can't access it later</p>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Ok</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
