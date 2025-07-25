'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/api/coreApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Props = {
	token: string;
};

const registerFormSchema = z
	.object({
		email: z.email(),
		username: z.string(),
		password: z.string().min(6),
		passwordCheck: z.string().min(6),
	})
	.refine(data => data.password === data.passwordCheck, {
		message: "Passwords don't match",
		path: ['passwordCheck'],
	});

export const RegisterForm = ({ token }: Props) => {
	const router = useRouter();
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
			passwordCheck: '',
		},
	});

	async function onSubmit({ email, username, password }: z.infer<typeof registerFormSchema>) {
		try {
			await registerUser(email, username, password, token);
			router.push('/creator-pannel');
		} catch (error: unknown) {
			//TODO: Implement correct error handling
			toast.error(`User registration failed`);
		}
	}

	return (
		<div>
			<div className='text-center'>
				<h1 className='text-2xl font-semibold'>Sign Up</h1>
				<p className='text-muted-foreground'>Fill your credentials to create a new account.</p>
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
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="john's lab" {...field} />
									</FormControl>
									<FormDescription>Your channel and public display name</FormDescription>
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
						<FormField
							control={form.control}
							name='passwordCheck'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Repeat password</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full'>
							Sign Up
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};
