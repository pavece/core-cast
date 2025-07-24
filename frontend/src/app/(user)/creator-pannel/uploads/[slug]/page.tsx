import React from 'react';

type Props = {
	params: Promise<{ uploadId: string }>;
};

const UploadPage = async ({ params }: Props) => {
	const { uploadId } = await params;
	return <div>UploadPage</div>;
};

export default UploadPage;
