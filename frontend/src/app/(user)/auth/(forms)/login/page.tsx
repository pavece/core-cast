'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginUser } from '@/api/coreApi';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { LoginOtpForm } from './login-otp-form';
import { useRouter } from 'next/navigation';
import { handleApiError } from '@/api/errors';

const loginFormSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});

const LoginPage = () => {
	const router = useRouter();
	const [requiresTOTP, setRequiresTOTP] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit({ email, password }: z.infer<typeof loginFormSchema>) {
		try {
			setLoading(true);
			await loginUser(email, password);
			router.push('/creator-pannel');
		} catch (error) {
			setLoading(false);
			if (error instanceof AxiosError && error.response?.data.requiresTotp) {
				setRequiresTOTP(true);
				return;
			}

			handleApiError(error);
		}
	}

	return (
		<div>
			{!requiresTOTP && (
				<>
					<div className='text-center'>
						<h1 className='text-2xl font-semibold'>Sign In</h1>
						<p className='text-muted-foreground'>Fill your credentials to access the creator pannel.</p>
					</div>

					<div className='mt-6'>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder='john@acme.inc' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type='password' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type='submit' className='w-full' disabled={loading}>
									{loading ? 'Loading...' : 'Sign In'}
								</Button>
							</form>
						</Form>
					</div>
				</>
			)}

			{requiresTOTP && (
				<LoginOtpForm
					password={form.getValues('password')}
					email={form.getValues('email')}
					onFailure={() => toast.error('Invalid OTP code')}
					onSuccess={() => router.push('/creator-pannel')}
				/>
			)}
		</div>
	);
};

export default LoginPage;
