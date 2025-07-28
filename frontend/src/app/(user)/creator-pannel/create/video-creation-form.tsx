'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Pen } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { createVideo } from '@/api/coreApi';
import { handleApiError } from '@/api/errors';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	title: z.string().min(3).max(250),
	description: z.string().min(10).max(1000),
	public: z.boolean(),
});

export const VideoCreationForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			public: false,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setLoading(true);
			const { data } = await createVideo(values.title, values.description, values.public);
			setLoading(false);
			toast.success('Video sucesfully created, now you can upload files');
			router.replace(`/creator-pannel/create/upload/${data.video.id}`);
		} catch (error) {
			setLoading(false);
			handleApiError(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Something interesting...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder='Tell me more...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='public'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='flex gap-2 items-center'>
									<Label htmlFor='public-switch'>Public</Label>
									<Switch checked={field.value} onCheckedChange={field.onChange} id='public-switch' />
								</div>
							</FormControl>
							<FormDescription>
								If not public the video won't be listed in any recomendation or search. But it will be accessible by
								link.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full'>
					{loading ? (
						'Loading...'
					) : (
						<>
							<Pen /> Create
						</>
					)}
				</Button>
			</form>
		</Form>
	);
};
