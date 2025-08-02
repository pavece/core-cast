import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function batchPromises(promises: Promise<any>[], maxConcurrent: number) { // eslint-disable-line
	let currentBatch = 0;
	const totalBatches = Math.ceil(promises.length / maxConcurrent);

	for (let i = 0; i < totalBatches; i++) {
		const batch: Promise<any>[] = []; // eslint-disable-line

		for (
			let j = maxConcurrent * currentBatch;
			j < Math.min(maxConcurrent * currentBatch + maxConcurrent, promises.length);
			j++
		) {
			batch.push(promises[j]);
		}

		await Promise.all(batch);
		currentBatch++;
	}
}

export const cutString = (str: string, length: number) => {
	const ext = str.length > length ? '...' : '';
	return str.slice(0, length) + ext;
};
