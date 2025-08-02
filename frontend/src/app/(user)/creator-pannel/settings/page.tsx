'use client';

import React from 'react';
import { UserSettingsForm } from './settings-form';
import { useQuery } from '@tanstack/react-query';
import { getPersonalUserInfo } from '@/api/coreApi';
import { ActionsMenu } from './actions-menu';
import { ImagesMenu } from './images-menu';
import { SectionHeader } from '@/components/control-pannel/section-header';
import { Skeleton } from '@/components/ui/skeleton';

const UserSettingsPage = () => {
	const { data: apiResponse, isLoading } = useQuery({ queryKey: ['user'], queryFn: () => getPersonalUserInfo() });

	if (isLoading) return <SettingsSkeleton />;

	return (
		<>
			<SectionHeader title='User settings' subtitle='Manage your user and channel settings' />

			<section className='w-full grid lg:grid-cols-2 gap-4 grid-cols-1'>
				<div>
					<UserSettingsForm userInformation={apiResponse?.data.user} />
					<ActionsMenu otpEnabled={apiResponse?.data.user.otpEnabled || false} />
				</div>
				<div className='w-full'>
					<ImagesMenu coverImage={apiResponse?.data.user.channelCover} profilePicture={apiResponse?.data.user.avatar} />
				</div>
			</section>
		</>
	);
};

export default UserSettingsPage;

const SettingsSkeleton = () => {
	return (
		<section className='w-full grid lg:grid-cols-2 gap-4 grid-cols-1'>
			<div>
				<Skeleton className='w-full h-[40px]' />
				<Skeleton className='w-full h-[40px] mt-6' />
				<Skeleton className='w-full h-[60px] mt-6' />
			</div>
			<div className='w-full'>
				<Skeleton className='w-full h-[60px]' />
				<Skeleton className='w-full h-[60px] mt-6' />
			</div>
		</section>
	);
};
