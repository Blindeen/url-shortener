'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon } from 'lucide-react';

export function CreateShortUrlForm() {
    return (
        <form className='flex w-5/6 gap-x-2 md:w-3/5 lg:w-4/12'>
            <Input className='bg-white' placeholder='Enter a URL' />
            <Button
                className='cursor-pointer'
                variant='secondary'
                size='icon'
                onClick={() => console.log('Shorten')}
            >
                <ChevronRightIcon />
            </Button>
        </form>
    );
}
