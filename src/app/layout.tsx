import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';

import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'URL Shortener',
    description: 'A simple URL shortener application',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SidebarProvider defaultOpen={defaultOpen}>
                    <AppSidebar />
                    <main className='flex w-full flex-col'>
                        <SidebarTrigger className='mt-1 ml-1 cursor-pointer' />
                        <div className='flex-1'>{children}</div>
                    </main>
                </SidebarProvider>
                <Toaster />
            </body>
        </html>
    );
}
