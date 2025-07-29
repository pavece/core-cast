import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

export const UploadSuccessCard = () => {
	const router = useRouter();

	const handleRedirect = () => {
		router.push('/creator-pannel/uploads');
	};

	return (
		<Card className='w-full max-w-[500px]'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Check /> Video Uploaded Successfully
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Your video has been uploaded and will begin processing shortly.</p>
			</CardContent>
			<CardFooter>
				<Button className='ml-auto' onClick={handleRedirect}>
					Go to My Videos
				</Button>
			</CardFooter>
		</Card>
	);
};
