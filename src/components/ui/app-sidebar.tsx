'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Home, LogInIcon, UserPlus } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
    {
        title: 'Home',
        url: '/',
        icon: <Home />,
    },
    {
        title: 'Register',
        url: '/register',
        icon: <UserPlus />,
    },
    {
        title: 'Login',
        url: '/login',
        icon: <LogInIcon />,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar variant='sidebar' collapsible='offcanvas'>
            <SidebarHeader>
                <span className='text-lg font-bold uppercase'>
                    🔗 URL shortener
                </span>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(({ title, url, icon }) => (
                                <SidebarMenuItem key={title}>
                                    <SidebarMenuButton
                                        className='min-h-10'
                                        isActive={pathname === url}
                                        asChild
                                    >
                                        <Link href={url}>
                                            {icon}
                                            <span className='text-base'>
                                                {title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
