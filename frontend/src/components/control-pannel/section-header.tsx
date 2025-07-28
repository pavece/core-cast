import React from 'react';

type Props = {
	title: string;
	subtitle: string;
};

export const SectionHeader = ({ title, subtitle }: Props) => {
	return (
		<div>
			<h1 className='text-2xl font-medium'>{title}</h1>
			<p className='text-sm text-muted-foreground'>{subtitle}</p>
		</div>
	);
};
