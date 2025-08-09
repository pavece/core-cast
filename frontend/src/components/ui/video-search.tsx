'use client';

import React, { FormEvent, useState } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const VideoSearch = () => {
	const [query, setQuery] = useState('');
	const router = useRouter();

	const onSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push(`/search?q=${query}`);
	};

	return (
		<form onSubmit={onSearch} className='flex w-full max-w-[550px] rounded-md bg-background'>
			<Input
				placeholder='Search videos'
				className='w-full rounded-tr-none rounded-br-none h-10'
				onChange={e => {
					setQuery(e.target.value);
				}}
			/>
			<Button
				className='border rounded-tl-none rounded-bl-none border-l-0 w-[10%] h-10'
				variant='secondary'
				type='submit'
			>
				<Search />
			</Button>
		</form>
	);
};
