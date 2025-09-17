import { CreateShortUrlForm } from '@/features/url-shortener';

export default function Home() {
    return (
        <div className='flex h-full flex-col items-center justify-center gap-y-10'>
            <h1 className='text-6xl select-none'>🔗</h1>
            <CreateShortUrlForm />
        </div>
    );
}
