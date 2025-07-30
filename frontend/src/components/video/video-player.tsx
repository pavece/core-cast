'use client';

import { registerView } from '@/api/coreApi';
import { Ref, useEffect, useRef } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

type Props = {
	hlsMasterList: string;
	videoId: string;
};

const onRegisterView = async (videoId: string) => {
	await registerView(videoId);
};

export const VideoPlayer = ({ hlsMasterList, videoId }: Props) => {
	const videoRef = useRef<HTMLVideoElement | string>('');
	const playerRef = useRef<Player | null>(null);

	useEffect(() => {
		console.log(hlsMasterList);

		if (!playerRef.current) {
			playerRef.current = videojs(videoRef.current, {
				controls: true,
				responsive: true,
				fluid: true,
				preload: 'auto',
				sources: [
					{
						src: hlsMasterList,
						type: 'application/x-mpegURL',
					},
				],
			});
		}

		return () => {
			if (playerRef.current) {
				playerRef.current.dispose();
				playerRef.current = null;
			}
		};
	}, [hlsMasterList]);

	useEffect(() => {
		onRegisterView(videoId);
	}, [videoId]);

	return (
		<div data-vjs-player>
			<video ref={videoRef as Ref<HTMLVideoElement>} className='video-js vjs-default-skin' autoPlay />
		</div>
	);
};
