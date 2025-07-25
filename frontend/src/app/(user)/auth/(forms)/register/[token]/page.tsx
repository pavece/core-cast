import React from 'react';
import { RegisterForm } from './register-form';

type Props = {
	params: Promise<{ token: string }>;
};

const RegisterPage = async ({ params }: Props) => {
	const { token } = await params;
	//TODO: Validate token here too

	return (
		<>
			<RegisterForm token={token} />
		</>
	);
};

export default RegisterPage;
