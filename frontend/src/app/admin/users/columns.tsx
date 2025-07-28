'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

export type User = {
	id: string;
	username: string;
	email: string;
	avatar: string | null;
	otpEnabled: boolean;
	banned: boolean;
};

export const columns: ColumnDef<User>[] = [
	{
		id: 'select',
		header: 'Select user',
		cell: ({ row, table }) => {
			return (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={value => {
						if (!!value) table.toggleAllRowsSelected(false); //Only one row can be selected at a time
						row.toggleSelected(!!value);
					}}
					aria-label='Select row'
				/>
			);
		},
	},
	{
		accessorKey: 'avatar',
		header: 'Avatar',
		cell: ({ row }) => {
			return (
				<Avatar>
					<AvatarImage src={row.getValue('avatar')} className='w-10 h-10' />
				</Avatar>
			);
		},
	},
	{
		accessorKey: 'username',
		header: 'Username',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'otpEnabled',
		header: 'Otp enabled',
		cell: ({ row }) => {
			if (row.getValue('otpEnabled')) {
				return <Badge className='bg-green-400'>Yes</Badge>;
			}
			return <Badge variant='destructive'>No</Badge>;
		},
	},
	{
		accessorKey: 'banned',
		header: 'Banned',
		cell: ({ row }) => {
			if (row.getValue('banned')) {
				return <Badge variant='destructive'>Yes</Badge>;
			}
			return <Badge className='bg-green-400'>No</Badge>;
		},
	},
];
