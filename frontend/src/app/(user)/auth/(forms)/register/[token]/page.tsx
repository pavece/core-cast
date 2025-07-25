import React from 'react';

type Props = {
	params: Promise<{ token: string }>;
};

const RegisterPage = async ({ params }: Props) => {
	const { token } = await params;

	return <div>Register: {token}</div>;
};

export default RegisterPage;
