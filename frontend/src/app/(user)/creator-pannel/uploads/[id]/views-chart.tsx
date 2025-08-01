'use client';

import { getVideoMetrics } from '@/api/coreApi';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectTrigger, SelectValue, Select, SelectContent, SelectItem } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
	videoId: string;
};

const chartConfig: ChartConfig = {
	views: {
		label: 'Views',
		color: 'var(--chart-2)',
	},
};

export const ViewsChart = ({ videoId }: Props) => {
	const [selectedDays, setSelectedDays] = useState('7');
	const {
		data: videoInteractions,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryFn: () => getVideoMetrics(videoId, Number(selectedDays)),
		queryKey: ['video-metrics', videoId, selectedDays],
		enabled: !!videoId,
	});

	const formatTickValue = (value: string) => {
		const date = new Date(value);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		});
	};

	const onChangeSelectedDays = (value: string) => {
		setSelectedDays(value);
	};

	if (isLoading) return <ChartSkeleton />;

	if (error) {
		return (
			<div className='rounded-md border p-4 bg-card'>
				<div className='h-[300px] flex items-center justify-center'>
					<div className='text-destructive'>Failed to load chart data</div>
				</div>
			</div>
		);
	}

	if (!videoInteractions?.data?.viewsDistribution?.length) {
		return (
			<div className='rounded-md border p-4 bg-card'>
				<div className='h-[300px] flex items-center justify-center'>
					<div className='text-muted-foreground'>No data available</div>
				</div>
			</div>
		);
	}

	return (
		<Card className='space-y-4'>
			<CardHeader>
				<div className='flex justify-between'>
					<div>
						<CardTitle>Metrcis</CardTitle>
						<CardDescription>Video metrics and information</CardDescription>
					</div>
					<Select value={selectedDays} onValueChange={onChangeSelectedDays}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='1'>Last day</SelectItem>
							<SelectItem value='7'>Last 7 days</SelectItem>
							<SelectItem value='15'>Last 15 days</SelectItem>
							<SelectItem value='30'>Last 30 days</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>

			<CardContent>
				<ChartContainer config={chartConfig} className='w-full max-h-[400px]'>
					<AreaChart data={videoInteractions.data.viewsDistribution}>
						<defs>
							<linearGradient id='fillViews' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-views)' stopOpacity={0.8} />
								<stop offset='95%' stopColor='var(--color-views)' stopOpacity={0.1} />
							</linearGradient>
						</defs>

						<CartesianGrid strokeDasharray='3 3' vertical={false} className='opacity-30' />

						<XAxis dataKey='time' tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />

						<YAxis
							domain={[0, Math.max(...videoInteractions.data.viewsDistribution.map(v => v.views))]}
							tickLine={false}
							axisLine={false}
							className='text-xs'
							width={40}
						/>

						<Area dataKey='views' type='natural' fill='url(#fillViews)' stroke='var(--color-views)' stackId='a' />

						<ChartTooltip
							content={<ChartTooltipContent labelFormatter={label => `Date: ${formatTickValue(label as string)}`} />}
						/>
					</AreaChart>
				</ChartContainer>
				<hr className='mt-4 mb-4' />
				<div className='mt-4'>
					<div>
						<h3 className='font-medium'>General metrcis</h3>
						<p className='text-sm text-muted-foreground'>General public metrics</p>
					</div>
					<div className='w-full rounded-md mt-4 flex gap-4'>
						<p>
							<span className='text-muted-foreground'>Total Views:</span>{' '}
							{videoInteractions.data.generalInteractions.viewCount.toString()}
						</p>
						<p>
							<span className='text-muted-foreground'>Likes:</span>{' '}
							{videoInteractions.data.generalInteractions.likeCount.toString()}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export const ChartSkeleton = () => {
	return <Skeleton className='w-full h-[600px]' />;
};
