'use client';

import { searchVideos } from '@/api/coreApi';
import { Loading } from '@/components/ui/loading';
import { VideoCard } from '@/components/video/video-card';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const SearchPage = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get('q');

	const { data: searchResults, isLoading } = useQuery({
		queryFn: () => searchVideos(query || ''),
		queryKey: ['search', query],
	});

	if (!searchResults?.data.videos.length) {
		return (
			<div className='w-full h-[50vh] flex items-center justify-center'>
				<h1>No results</h1>
			</div>
		);
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(200px,_300px))] justify-center gap-4'>
			{searchResults.data.videos.map(v => (
				<VideoCard {...v} key={v.id} />
			))}
		</div>
	);
};

export default SearchPage;
