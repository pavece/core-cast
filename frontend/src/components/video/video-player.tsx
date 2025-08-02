'use client';

import { registerView } from '@/api/coreApi';
import Hls, { Level } from 'hls.js';
import { CSSProperties, Ref, useEffect, useRef, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next/client';
import {
	MediaController,
	MediaControlBar,
	MediaTimeRange,
	MediaTimeDisplay,
	MediaPlayButton,
	MediaFullscreenButton,
	MediaMuteButton,
	MediaPipButton,
} from 'media-chrome/react';

import { MediaRenditionMenuButton } from 'media-chrome/react/menu';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem,
} from '../ui/dropdown-menu';

type Props = {
	hlsMasterList: string;
	videoId: string;
};

const variables = {
	'--media-primary-color': 'var(--primary)',
	'--media-secondary-color': 'var(--background)',
	'--media-text-color': 'var(--foreground)',
	'--media-background-color': 'var(--background)',
	'--media-control-hover-background': 'var(--accent)',
	'--media-font-family': 'var(--font-sans)',
	'--media-live-button-icon-color': 'var(--muted-foreground)',
	'--media-live-button-indicator-color': 'var(--destructive)',
	'--media-range-track-background': 'var(--border)',
} as CSSProperties;

const onRegisterView = async (videoId: string) => {
	const lastVideos = JSON.parse(getCookie('last_videos') || '[]') as string[];
	if (lastVideos.length > 2) {
		lastVideos.pop();
	}
	lastVideos.unshift(videoId);
	setCookie('last_videos', lastVideos);
	await registerView(videoId);
};

export const VideoPlayer = ({ hlsMasterList, videoId }: Props) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const hlsRef = useRef<Hls | null>(null);
	const [qualityLevels, setQualityLevels] = useState<Level[]>([]);
	const [currentLevel, setCurrentLevel] = useState<number>(-1);

	useEffect(() => {
		const video = videoRef.current;

		if (video) {
			if (Hls.isSupported()) {
				hlsRef.current = new Hls({
					debug: false,
					enableWorker: true,
					startLevel: 2,
				});

				hlsRef.current.loadSource(hlsMasterList);
				hlsRef.current.attachMedia(video);

				hlsRef.current.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
					setQualityLevels(data.levels);
				});

				hlsRef.current.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
					setCurrentLevel(data.level);
				});

				hlsRef.current.on(Hls.Events.ERROR, (_, data) => {
					console.error('HLS Error:', data);
				});
			} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
				video.src = hlsMasterList;
			}
		}

		return () => {
			if (hlsRef.current) {
				hlsRef.current.destroy();
				hlsRef.current = null;
			}
		};
	}, [hlsMasterList]);

	useEffect(() => {
		onRegisterView(videoId);
	}, [videoId]);

	const onQualityChange = (value: number) => {
		if (hlsRef.current) {
			hlsRef.current.nextLevel = value;
			setCurrentLevel(value);
		}
	};

	return (
		<div className='w-full'>
			<MediaController className='w-full aspect-video rounded-md' style={{ ...variables }}>
				<video
					ref={videoRef as Ref<HTMLVideoElement>}
					slot='media'
					playsInline
					preload='metadata'
					className='w-full h-full object-contain rounded-md'
					tabIndex={-1}
				/>

				<MediaControlBar className='gap-2  p-2 px-4 bg-card/90 backdrop-blur-sm rounded-full w-[95%] mx-auto mb-2'>
					<MediaPlayButton className='bg-transparent' />
					<MediaTimeDisplay className='bg-transparent' />
					<MediaMuteButton className='bg-transparent' />
					<MediaTimeRange className='bg-transparent' />
					<DropdownMenu modal>
						<DropdownMenuTrigger>
							<MediaRenditionMenuButton className='bg-transparent' />
						</DropdownMenuTrigger>
						<DropdownMenuContent side='top'>
							<DropdownMenuLabel>Quality</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{qualityLevels.map((l, i) => (
								<DropdownMenuCheckboxItem checked={currentLevel == i} onClick={() => onQualityChange(i)} key={i}>
									{l.height}p
								</DropdownMenuCheckboxItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<MediaPipButton className='bg-transparent' />
					<MediaFullscreenButton className='bg-transparent' />
				</MediaControlBar>
			</MediaController>
		</div>
	);
};
