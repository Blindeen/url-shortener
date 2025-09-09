import Image from 'next/image';

export default function NotFoundPage() {
    return (
        <div className='bg-light-silver flex h-full flex-col items-center justify-center gap-y-12'>
            <Image
                src='/not-found.svg'
                alt='Not found image'
                width={430}
                height={286}
                priority={true}
                draggable={false}
            />
            <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance'>
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </h1>
        </div>
    );
}
