import Link from 'next/link';
import Avatar from '../components/avatar';
import Date from '../components/date';
import CoverImage from '../components/cover-image';

function createMarkup(text) {
    return { __html: text };
}

export default function HeroPost({ title, coverImage, date, richText, slug }) {
    return (
        <section>
            <div className='mb-8 md:mb-16'>
                {coverImage.length > 0 && <CoverImage title={coverImage[0].title} slug={slug} url={coverImage[0].url} />}
            </div>
            <div className='md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28'>
                <div>
                    <h3 className='mb-4 text-4xl lg:text-6xl leading-tight'>
                        <Link as={`/blog/${slug}`} href='/blog/[slug]'>
                            <a className='hover:underline'>{title}</a>
                        </Link>
                    </h3>
                    <div className='mb-4 md:mb-0 text-lg'>
                        <Date dateString={date} />
                    </div>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={createMarkup(richText)} className='text-lg leading-relaxed mb-4' />
                </div>
            </div>
        </section>
    );
}
