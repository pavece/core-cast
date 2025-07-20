import { HousekeepingJobManager } from './domain/jobs/job-manager';

function main() {
	console.log('Housekeeping service');

	const jobManager = new HousekeepingJobManager();

	jobManager.start();
}

main();
