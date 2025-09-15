import Image from 'next/image';

export default function ErrorPage() {
    return (
        <div className='flex h-full flex-col items-center justify-center gap-y-12'>
            <Image
                src='/server-error.svg'
                alt='Server error image'
                width={400}
                height={309}
                priority={true}
                draggable={false}
            />
            <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance'>
                Oops! The app seems to be down. Please try again later
            </h1>
        </div>
    );
}
