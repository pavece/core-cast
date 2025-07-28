import { Loader } from 'lucide-react';
import React from 'react';

export const Loading = () => {
	return (
		<div className='flex items-center justiy-center h-[100px] w-full'>
			<Loader className='animate-spin' /> Loading...
		</div>
	);
};
