'use client';

import { Suspense } from 'react';
import { searchVideos } from '@/api/coreApi';
import { VideoCard } from '@/components/video/video-card';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { SearchSkeleton } from './search-skeleton';
import { Metadata } from 'next';

const SearchContent = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get('q');

	const { data: searchResults, isLoading } = useQuery({
		queryFn: () => searchVideos(query || ''),
		queryKey: ['search', query],
		enabled: !!query,
	});

	if (isLoading) {
		return <SearchSkeleton />;
	}

	if (!query || !searchResults?.data.videos.length) {
		return (
			<div className='w-full h-[50vh] flex items-center justify-center'>
				<h1>No results</h1>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(200px,_300px))] justify-center gap-4'>
			{searchResults.data.videos.map(v => (
				<VideoCard {...v} key={v.id} />
			))}
		</div>
	);
};

const SearchPage = () => {
	return (
		<Suspense fallback={<SearchSkeleton />}>
			<SearchContent />
		</Suspense>
	);
};

export default SearchPage;
