'use client';

import { Badge } from '@/components/ui/badge';
import { cutString } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, EyeOff } from 'lucide-react';

export type Video = {
	id: string;
	title: string;
	description: string;
	public: boolean;
	thumbnail: string | null;
	videoProcessingTask: { id: string }[];
};

const statusColors: { [key: string]: string } = {
	'Upload pending': 'text-red-500',
	Processing: 'text-yellow-500',
	Available: 'text-green-500',
};

export const columns: ColumnDef<Video>[] = [
	{ accessorKey: 'title', header: 'Video title' },
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => {
			return <p>{cutString(row.original.description, 30)}</p>;
		},
	},
	{
		accessorKey: 'public',
		header: 'Is public',
		cell: ({ row }) => {
			const isPublic = row.original.public;
			return (
				<Badge>
					{isPublic ? (
						<>
							<Eye /> Yes
						</>
					) : (
						<>
							<EyeOff /> No
						</>
					)}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'videoProcessingTask',
		header: 'Status',
		cell: ({ row }) => {
			const processingTasks = row.original.videoProcessingTask;
			const thumbnail = row.original.thumbnail;

			let status = 'Upload pending';
			if ((processingTasks as object[]).length) {
				status = 'Processing';
			}

			if (thumbnail) {
				status = 'Available';
			}

			return <p className={statusColors[status]}>{status}</p>;
		},
	},
];
