import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const SearchSkeleton = () => {
	const items = new Array(5).fill(true);

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(200px,_300px))] justify-center gap-4'>
				{items.map((e, i) => (
					<div className='flex flex-col space-y-3' key={i}>
						<Skeleton className='h-[125px] w-[250px] rounded-xl' />
						<div className='space-y-2'>
							<Skeleton className='h-4 w-[250px]' />
						</div>
					</div>
				))}
			</div>
		</>
	);
};
