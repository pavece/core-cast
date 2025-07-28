import React from 'react';

const RegisterLoginLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className='grid grid-cols-2 min-h-[100vh]'>
			<div className='hidden md:block f bg-[url(/login-background.webp)] bg-center bg-cover'>
				<div className='w-full h-full flex flex-col justify-between backdrop-blur-xs bg-black/30 p-4'>
					<div>
						<img src='/logo.svg' className='w-[140px] md:w-[160px]' />
					</div>
					<div>
						<p>
							This section is only intended for users that have explicit login / register authorization from an
							administrator.
						</p>
					</div>
				</div>
			</div>
			<div className='md:border-l-1 p-4'>
				<div className='md:hidden'>
					<img src='/logo.svg' className='w-[140px] md:w-[160px]' />
				</div>

				<div className='flex items-center justify-center w-full h-full'>{children}</div>
			</div>
		</div>
	);
};

export default RegisterLoginLayout;
