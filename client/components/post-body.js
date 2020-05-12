import markdownStyles from './markdown-styles.module.css';

function createMarkup(text) {
    return { __html: text };
}

export default function PostBody({ richText }) {
    return (
        <div className='max-w-2xl mx-auto'>
            <div className={markdownStyles['markdown']}>
                <div dangerouslySetInnerHTML={createMarkup(richText)} />
            </div>
        </div>
    );
}
