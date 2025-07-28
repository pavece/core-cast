'use client';

import { adminGetUsers } from '@/api/coreApi';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { UsersTable } from './users-table';
import { columns } from './columns';
import { SectionHeader } from '@/components/control-pannel/section-header';
import { Loading } from '@/components/ui/loading';

const AdminUsersPage = () => {
	const { isLoading, data: apiResponse, refetch } = useQuery({ queryKey: ['admin', 'users'], queryFn: adminGetUsers });

	if (isLoading) return <Loading />;

	return (
		<div>
			<SectionHeader title='Manage users' subtitle='Manage users in the system' />
			<section>
				<UsersTable data={apiResponse?.data.users || []} columns={columns} onRefresh={refetch} />
			</section>
		</div>
	);
};

export default AdminUsersPage;
