import { RegisterForm } from './register-form';

type Props = {
	params: Promise<{ token: string }>;
};

const RegisterPage = async ({ params }: Props) => {
	const { token } = await params;

	return (
		<>
			<RegisterForm token={token} />
		</>
	);
};

export default RegisterPage;
