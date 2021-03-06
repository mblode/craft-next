import Link from 'next/link';
import Avatar from '../components/avatar';
import Date from '../components/date';
import CoverImage from './cover-image';

function createMarkup(text) {
    return { __html: text };
}

export default function PostPreview({ title, coverImage, date, richText, slug, author }) {
    return (
        <div>
            <div className='mb-5'>
                {coverImage && coverImage.length > 0 && (
                    <CoverImage title={coverImage[0].title} slug={slug} url={coverImage[0].url} />
                )}
            </div>
            <h3 className='text-3xl mb-3 leading-snug'>
                <Link as={`/blog/${slug}`} href='/blog/[slug]'>
                    <a className='hover:underline'>{title}</a>
                </Link>
            </h3>
            <div className='text-lg mb-4'>
                <Date dateString={date} />
            </div>
            <div dangerouslySetInnerHTML={createMarkup(richText)} className='text-lg leading-relaxed mb-4' />
            {author && <Avatar author={author} />}
        </div>
    );
}
