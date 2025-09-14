import Link from 'next/link';

import { Home, LogInIcon, UserPlus } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
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
        url: '/registration',
        icon: <UserPlus />,
    },
    {
        title: 'Login',
        url: '/login',
        icon: <LogInIcon />,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='gap-x-2 text-sm font-bold uppercase'>
                        <span className='text-xl'>🔗</span>
                        URL shortener
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        className='min-h-10'
                                        asChild
                                    >
                                        <Link href={item.url}>
                                            {item.icon}
                                            <span className='text-base'>
                                                {item.title}
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
