'use client';

import { adminGetUsers } from '@/api/coreApi';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AdminUsersPage = () => {
	const { isLoading, data: apiResponse } = useQuery({ queryKey: ['admin', 'users'], queryFn: adminGetUsers });

	if (isLoading) return <h1>Loading...</h1>;

	console.log(apiResponse);

	return (
		<div>
			<div>
				<h1 className='text-2xl'>Admin - users</h1>
				<p className='text text-muted-foreground'>Manage users in the system</p>
			</div>

			<section></section>
		</div>
	);
};

export default AdminUsersPage;
