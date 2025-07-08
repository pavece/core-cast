export async function batchPromises(promises: Promise<any>[], maxConcurrent: number) {
	let currentBatch = 0;
    const totalBatches = Math.ceil(promises.length / maxConcurrent);

    for(let i = 0; i<totalBatches; i++){
        const batch: Promise<any>[] = [];

        for(let j = maxConcurrent * currentBatch; j< Math.min(maxConcurrent * currentBatch + maxConcurrent, promises.length); j++){
            batch.push(promises[j])
        }

        await Promise.all(batch)
        currentBatch++;
    }
}
