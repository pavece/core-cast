import { Button } from '@/components/ui/button';
import { ExternalLink, Pen, Trash } from 'lucide-react';
import React from 'react';

export const VideoActions = () => {
	return (
		<div className='flex gap-2'>
			<Button>
				<Pen /> Edit
			</Button>
			<Button>
				<ExternalLink /> Open
			</Button>
			<Button variant='destructive'>
				<Trash /> Delete
			</Button>
		</div>
	);
};
