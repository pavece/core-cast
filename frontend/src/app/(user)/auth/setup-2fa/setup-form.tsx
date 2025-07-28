'use client';
import { activate2FA, setup2FA } from '@/api/coreApi';
import { handleApiError } from '@/api/errors';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const Setup2FAForm = () => {
	const router = useRouter();
	const [otpCode, stetOtpCode] = useState('');
	const [loading, setLoading] = useState(true);
	const [qrCodeData, setQrCodeData] = useState<string>('');
	const [recoveryCode, setRecoveryCode] = useState('');

	useEffect(() => {
		const activateAndgenerateQr = async () => {
			try {
				setLoading(true);
				const { data } = await setup2FA();
				setRecoveryCode(data.authenticatorUri.recoveryCode);
				console.log(data.authenticatorUri.otpAuthUri);
				setQrCodeData(await QRCode.toDataURL(data.authenticatorUri.otpAuthUri));
				setLoading(false);
			} catch (error) {
				handleApiError(error);
			}
		};

		activateAndgenerateQr();
	}, []);

	const onValidateOTP = async () => {
		try {
			await activate2FA(otpCode);
			toast.success('Otp enabled');
			router.replace('/creator-pannel/settings');
		} catch (error) {
			handleApiError(error);
		}
	};

	if (loading) return <h2>Loading...</h2>;

	return (
		<div className='flex items-start mt-6 flex-col max-w-[500px] w-full'>
			<h3 className='text-lg font-medium'>Step 1:</h3>
			<p className='text-muted-foreground'>Scan this QR code with you authenticator app of choice</p>
			<div className='bg-card p-4 rounded-md border flex items-center flex-col w-full mt-2'>
				<img src={qrCodeData} />
			</div>

			<h3 className='text-lg font-medium mt-4'>Step 2:</h3>
			<p className='text-muted-foreground'>Save this recovery code in a safe place</p>
			<div className='bg-card p-4 rounded-md border flex items-center flex-col w-full mt-2'>
				<p className='font-mono'>{recoveryCode}</p>
			</div>

			<h3 className='text-lg font-medium mt-4'>Step 3:</h3>
			<p className='text-muted-foreground'>Enter the generated code here</p>
			<div className='flex items-center justify-center mt-2 w-full'>
				<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={stetOtpCode}>
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

			<Button className='w-full mt-6' disabled={otpCode.length < 6} onClick={onValidateOTP}>
				<Check /> Submit
			</Button>
			<p className='italic w-full text-center mt-2 text-muted-foreground'>
				Do not close this page before sending the code
			</p>
		</div>
	);
};
