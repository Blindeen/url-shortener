'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Home, LogInIcon, UserPlus, LogOut } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

import { logout } from './actions';

export function AppSidebar({
    isUserAuthenticated,
}: {
    isUserAuthenticated: boolean;
}) {
    const pathname = usePathname();

    const authenticatedItems = isUserAuthenticated
        ? []
        : [
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

    const items = [
        {
            title: 'Home',
            url: '/',
            icon: <Home />,
        },
        ...authenticatedItems,
    ];

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
            <SidebarFooter>
                {isUserAuthenticated && (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className='min-h-10' asChild>
                                <Button variant='outline' onClick={logout}>
                                    <LogOut />
                                    <span className='text-base'>Logout</span>
                                </Button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
