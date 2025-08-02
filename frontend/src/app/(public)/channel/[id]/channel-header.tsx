import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';

type Props = {
	channelDescription: string;
	avatar: string | null;
	channelCover: string | null;
	username: string;
};

export const ChannelHeader = ({ channelDescription, avatar, channelCover, username }: Props) => {
	return (
		<div className='w-full '>
			<div
				style={{ background: `url(${channelCover || ''})` }}
				className='rounded-md h-[150px] md:h-[200px] !bg-center bg-no-repeat !bg-cover bg-card'
			></div>
			<div className='mt-4 flex gap-4 items-center'>
				<div>
					<Avatar>
						<AvatarImage className='w-18' src={avatar || ''} />
						<AvatarFallback className='bg-card p-5 rounded-full text-2xl '>
							{username.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
				<div>
					<h1 className='text-2xl font-medium capitalize'>{username}</h1>
					<p className='mt-1 text-muted-foreground'>{channelDescription}</p>
				</div>
			</div>
		</div>
	);
};
