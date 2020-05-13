import Avatar from '../components/avatar';
import Date from '../components/date';
import CoverImage from '../components/cover-image';
import PostTitle from '../components/post-title';

export default function PostHeader({ title, coverImage, date, author }) {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            <div className='hidden md:block md:mb-12'>
                {author && <Avatar fullName={author.fullName} photo={author.photo} />}
            </div>
            <div className='mb-8 md:mb-16 -mx-5 sm:mx-0'>
                {coverImage.length > 0 && <CoverImage title={coverImage[0].title} url={coverImage[0].url} />}
            </div>
            <div className='max-w-2xl mx-auto'>
                <div className='block md:hidden mb-6'>
                    {author && <Avatar fullName={author.fullName} photo={author.photo} />}
                </div>
                <div className='mb-6 text-lg'>
                    <Date dateString={date} />
                </div>
            </div>
        </>
    );
}
