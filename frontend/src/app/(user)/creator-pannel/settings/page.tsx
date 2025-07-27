'use client';

import React from 'react';
import { UserSettingsForm } from './settings-form';
import { useQuery } from '@tanstack/react-query';
import { getPersonalUserInfo } from '@/api/coreApi';
import { ActionsMenu } from './actions-menu';

export const UserSettingsPage = () => {
	const { data: apiResponse } = useQuery({ queryKey: ['user'], queryFn: getPersonalUserInfo });

	return (
		<>
			<div>
				<h1 className='text-2xl '>User settings</h1>
				<p className='text-muted-foreground'>Manage your user and channel settings</p>
			</div>
			<section className='w-full grid grid-cols-2 gap-2'>
				<div className='mt-6'>
					<UserSettingsForm userInformation={apiResponse?.data.user} />
					<ActionsMenu otpEnabled={apiResponse?.data.user.otpEnabled || false} />
				</div>
				<div className='w-full'></div>
			</section>
		</>
	);
};

export default UserSettingsPage;
