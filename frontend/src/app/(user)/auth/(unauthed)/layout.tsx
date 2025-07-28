import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react';

const RegisterLoginLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const cookieStore = await cookies();
    const session = cookieStore.get('session_token');

    if (session?.value) {
        redirect('/');
    }

    return (
        children
    );
};

export default RegisterLoginLayout;
