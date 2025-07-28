'use client';

import React from 'react';
import { UserSettingsForm } from './settings-form';
import { useQuery } from '@tanstack/react-query';
import { getPersonalUserInfo } from '@/api/coreApi';
import { ActionsMenu } from './actions-menu';
import { ImagesMenu } from './images-menu';
import { SectionHeader } from '@/components/control-pannel/section-header';

export const UserSettingsPage = () => {
	const { data: apiResponse, isLoading } = useQuery({ queryKey: ['user'], queryFn: getPersonalUserInfo });

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			<SectionHeader title='User settings' subtitle='Manage your user and channel settings' />

			<section className='w-full grid lg:grid-cols-2 gap-4 grid-cols-1'>
				<div className='mt-6'>
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
