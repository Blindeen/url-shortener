import { CreateShortUrlForm } from '@/features/url-shortener/CreateShortUrlForm';

export default function Home() {
    return (
        <div className='bg-light-silver flex h-full flex-col items-center justify-center gap-y-10'>
            <h1 className='text-6xl'>🔗</h1>
            <CreateShortUrlForm />
        </div>
    );
}
