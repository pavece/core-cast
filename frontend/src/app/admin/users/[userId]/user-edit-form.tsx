'use client';

import z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { adminUpdateUser } from '@/api/coreApi';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/api/errors';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
	username: z.string().min(3),
	email: z.email(),
	channelDescription: z.string().optional(),
	role: z.enum(['ADMIN', 'USER']),
});

type UserInformation = {
	username: string;
	channelDescription: string | null;
	email: string;
	role: 'ADMIN' | 'USER';
};

type Props = {
	userId: string;
	userInformation?: UserInformation;
};

export const EdtitUserForm = ({ userId, userInformation }: Props) => {
	const [updating, setUpdating] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { username: '', email: '', channelDescription: '', role: 'USER' },
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setUpdating(true);
			await adminUpdateUser(userId, values);
			setUpdating(false);
			toast.success('User settings updated');
		} catch (error) {
			setUpdating(false);
			handleApiError(error);
		}
	}

	useEffect(() => {
		if (userInformation) userInformation.channelDescription = userInformation.channelDescription || '';
		form.reset(userInformation as UserInformation & { channelDescription: string });
	}, [userInformation]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>User / channel name</FormLabel>
							<FormControl>
								<Input placeholder="Joe's lab" {...field} />
							</FormControl>
							<FormDescription>Your username and channel name</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='channelDescription'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Channel description</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='role'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl className='w-[140px]'>
									<SelectTrigger>
										<SelectValue placeholder="User's role" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='ADMIN'>Admin</SelectItem>
									<SelectItem value='USER'>User</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full' disabled={updating}>
					{updating ? 'Loading...' : 'Update'}
				</Button>
			</form>
		</Form>
	);
};
