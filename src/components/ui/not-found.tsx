import Image from 'next/image';

function NotFound({ description }: { description: string }) {
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
                {description}
            </h1>
        </div>
    );
}

export { NotFound };
