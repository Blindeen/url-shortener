import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import '../globals.css';

import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';

import { isUserAuthenticated } from '@/lib/auth';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        default: 'URL Shortener',
        template: 'URL Shortener - %s',
    },
    description: 'A simple URL shortener application',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
    const isAuthenticated = await isUserAuthenticated();

    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <main className='flex w-full'>
                    <SidebarProvider defaultOpen={defaultOpen}>
                        <AppSidebar isUserAuthenticated={isAuthenticated} />
                        <SidebarTrigger className='mt-1 ml-1 cursor-pointer' />
                    </SidebarProvider>
                    <div className='w-full flex-1'>{children}</div>
                </main>
                <Toaster />
            </body>
        </html>
    );
}
