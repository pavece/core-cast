import React from 'react';

type Props = {
	params: Promise<{ userId: string }>;
};

const AdminUserPage = async ({ params }: Props) => {
	const { userId } = await params;

	return <div>AdminUserPage {userId}</div>;
};

export default AdminUserPage;
