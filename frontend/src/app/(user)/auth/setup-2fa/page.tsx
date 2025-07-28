import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react';
import { getPersonalUserInfo } from '@/api/coreApi';
import { Setup2FAForm } from './setup-form';

const Setup2FAPage = async () => {
	const sessionToken = await (await cookies()).get('session_token')?.value;

	if (!sessionToken) {
		redirect('/');
	}

	const { data } = await getPersonalUserInfo(sessionToken);
	if (data.user.otpEnabled) {
		redirect('/control-pannel/settings');
	}

	return (
		<div>
			<h1 className='text-2xl font-medium'>Setup 2FA</h1>
			<Setup2FAForm />
		</div>
	);
};

export default Setup2FAPage;
