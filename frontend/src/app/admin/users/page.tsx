'use client';

import { adminGetUsers } from '@/api/coreApi';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { UsersTable } from './users-table';
import { columns } from './columns';

const AdminUsersPage = () => {
	const { isLoading, data: apiResponse, refetch } = useQuery({ queryKey: ['admin', 'users'], queryFn: adminGetUsers });

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<div>
			<div>
				<h1 className='text-2xl'>Admin - users</h1>
				<p className='text text-muted-foreground'>Manage users in the system</p>
			</div>

			<section className='mt-4'>
				<UsersTable data={apiResponse?.data.users || []} columns={columns} onRefresh={refetch} />
			</section>
		</div>
	);
};

export default AdminUsersPage;
