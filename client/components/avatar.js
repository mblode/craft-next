export default function Avatar({ author }) {
    return (
        <div className='flex items-center'>
            <img src={author.photo.url} className='w-12 h-12 rounded-full mr-4' alt={author.fullName} />
            <div className='text-xl font-bold'>{author.fullName}</div>
        </div>
    );
}
