'use client';

import { SectionHeader } from '@/components/control-pannel/section-header';
import React from 'react';
import { VideosTable } from './videos-table';
import { useQuery } from '@tanstack/react-query';
import { getUserVideos } from '@/api/coreApi';
import { columns } from './columns';

const MyUploadsPage = () => {
	const { data: apiResponse, refetch } = useQuery({ queryFn: getUserVideos, queryKey: ['personalVideos'] });

	return (
		<>
			<SectionHeader title='My Videos' subtitle='Manage your uploads' />
			<section>
				<VideosTable data={apiResponse?.data.videos || []} columns={columns} onRefresh={refetch} />
			</section>
		</>
	);
};

export default MyUploadsPage;
