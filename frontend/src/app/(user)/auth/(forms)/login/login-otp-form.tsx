import { loginUser } from '@/api/coreApi';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useState } from 'react';

type Props = {
	password: string;
	email: string;
	onSuccess: () => void;
	onFailure: () => void;
};

export const LoginOtpForm = ({ email, password, onSuccess, onFailure }: Props) => {
	const [OTP, setOTP] = useState('');
	const [loading, setLoading] = useState(false);

	async function onLogin() {
		try {
			setLoading(true);
			await loginUser(email, password, OTP);
			onSuccess();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			onFailure();
		}
	}

	return (
		<div className='flex items-center justify-center flex-col'>
			<h2 className='text-xl font-medium'>Enter OTP code</h2>
			<p className='text-muted-foreground '>Enter the OTP issued by the authenticator</p>
			<div className='mt-4'>
				<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={setOTP}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
			</div>
			<Button className='w-full mt-4' onClick={onLogin} disabled={OTP.length < 6 || loading}>
				{loading ? 'Loading...' : 'Sign In'}
			</Button>
		</div>
	);
};
