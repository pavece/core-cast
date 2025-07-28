'use client';

import { adminGetUsers } from '@/api/coreApi';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { UsersTable } from './users-table';
import { columns } from './columns';
import { SectionHeader } from '@/components/control-pannel/section-header';

const AdminUsersPage = () => {
	const { isLoading, data: apiResponse, refetch } = useQuery({ queryKey: ['admin', 'users'], queryFn: adminGetUsers });

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<div>
			<SectionHeader title='Manage users' subtitle='Manage users in the system' />

			<section className='mt-4'>
				<UsersTable data={apiResponse?.data.users || []} columns={columns} onRefresh={refetch} />
			</section>
		</div>
	);
};

export default AdminUsersPage;
