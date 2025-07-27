import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const handleApiError = (error: unknown, fallbackMessage: string = 'Unknown error') => {
	if (error instanceof AxiosError) {
		const apiErrorMessage = error.response?.data.message;

		toast.error(`Error ${error.status} -  ${apiErrorMessage || fallbackMessage}`);
	} else {
		toast.error(fallbackMessage);
	}
};
