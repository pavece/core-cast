import { adminGetUser } from '@/api/coreApi';
import { SectionHeader } from '@/components/control-pannel/section-header';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { EdtitUserForm } from './user-edit-form';
import { ActionsMenu } from './actions-menu';

type Props = {
	params: Promise<{ userId: string }>;
};

const AdminUserPage = async ({ params }: Props) => {
	const { userId } = await params;
	const sessionToken = (await cookies()).get('session_token')?.value;

	const { data } = await adminGetUser(userId, sessionToken).catch(() => notFound());

	return (
		<div>
			<SectionHeader
				title={`User - ${data.user.username}`}
				subtitle={`Update and manage ${data.user.username} profile`}
			/>
			<section className='mt-4 grid grid-cols-1 md:grid-cols-2'>
				<div>
					<EdtitUserForm userInformation={data.user} userId={userId} />
					<ActionsMenu userId={userId} />
				</div>
				<div></div>
			</section>
		</div>
	);
};

export default AdminUserPage;
