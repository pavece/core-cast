import { getDiscoveryFeed } from '@/api/coreApi';
import { VideoCard } from '@/components/video/video-card';
import { cookies } from 'next/headers';

export default async function Home() {
	try {
		const watchedVideosCokie = (await cookies()).get('last_videos')?.value;
		const videoFeed = await getDiscoveryFeed(watchedVideosCokie);

		return (
			<div className='grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(200px,_300px))] justify-center gap-4'>
				{videoFeed.data.videos.map(v => {
					return <VideoCard {...v} key={v.id} />;
				})}
			</div>
		);
	} catch (error) {
		return (
			<div className='w-full h-[50vh] flex items-center justify-center'>
				<h1 className='text-xl font-semibold'>No videos</h1>
			</div>
		);
	}
}
