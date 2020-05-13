export default function Avatar({ fullName, photo }) {
    return (
        <div className='flex items-center'>
            <img src={photo.url} className='w-12 h-12 rounded-full mr-4' alt={fullName} />
            <div className='text-xl font-bold'>{fullName}</div>
        </div>
    );
}
