import { BasicInfoContainer } from './basic-info-container';
import { SectionHeader } from '@/components/control-pannel/section-header';
import { ViewsChart } from './views-chart';

type Props = {
	params: Promise<{ id: string }>;
};

const UploadPage = async ({ params }: Props) => {
	const { id } = await params;

	return (
		<>
			<SectionHeader title='Video info' subtitle='Video info' />
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='col-span-1'>
					<BasicInfoContainer videoId={id} />
				</div>
				<div className='col-span-2'>
					<ViewsChart videoId={id} />
				</div>
			</div>
		</>
	);
};

export default UploadPage;
