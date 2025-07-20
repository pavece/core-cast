import { CronJob } from 'cron';
import { Logger } from '../logging/logger';
import { stalledUploadCleanupJob } from './stalled-upload-cleanup';
import { cleanupStalledProcessingTasks } from './stalled-processing-cleanup';

export class HousekeepingJobManager {
	private cronJobs: { [jobName: string]: CronJob } = {};
	private logger = new Logger().getLogger();

	private setupJobs() {
		this.cronJobs['interactionBatching'] = new CronJob('*/5 * * * *', () => {}, null, false);

		this.cronJobs['stalledUploadCleanup'] = new CronJob('0 */1 * * *', stalledUploadCleanupJob, null, false);

		this.cronJobs['stalledProcessingJobCleanup'] = new CronJob(
			'*/1 * * * *',
			cleanupStalledProcessingTasks,
			null,
			false
		);
	}

	public start() {
		this.setupJobs();

		for (const job in this.cronJobs) {
			this.cronJobs[job].start();
			this.logger.info(`Starting cron job: ${job}`);
		}
	}
}
