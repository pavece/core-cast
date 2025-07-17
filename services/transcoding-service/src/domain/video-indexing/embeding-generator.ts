import { Qdrant } from '@core-cast/qdrant';
import { VideoSearchRecord } from '@core-cast/types';
import { DataArray, pipeline } from '@xenova/transformers';

async function generateEmbeding(text: string) {
	const pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
	const embeding = await pipe(text, { pooling: 'mean', normalize: true });

	return embeding.data;
}

async function storeEmbeding(embeding: DataArray, videoInfo: VideoSearchRecord) {
	const qdrantClient = Qdrant.getInstance().getClient();
	qdrantClient.upsert('videos', { points: [{ id: videoInfo.id, vector: Array.from(embeding), payload: {...videoInfo} }] });
}

export async function generateStoreVideoEmbeding(videoInfo: VideoSearchRecord) {
	const text = videoInfo.title + ': ' + videoInfo.description;
	const embeding = await generateEmbeding(text);
	await storeEmbeding(embeding, videoInfo);
}
