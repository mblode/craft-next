import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import MoreStories from '../../components/more-stories';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import SectionSeparator from '../../components/section-separator';
import Layout from '../../components/layout';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';
import PostTitle from '../../components/post-title';

export default function Post({ post, morePosts }) {
    const router = useRouter();
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout>
            <Container>
                <Header />
                {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article>
                            <Head>
                                <title>{post.title} | Craft Next</title>
                                <meta property='og:image' content={post.coverImage[0].url} />
                            </Head>
                            <PostHeader
                                title={post.title}
                                coverImage={post.coverImage[0]}
                                date={post.date}
                                author={post.author}
                            />
                            <PostBody content={post.content} />
                        </article>
                        <SectionSeparator />
                        {morePosts && morePosts.length > 0 && <MoreStories posts={morePosts} />}
                    </>
                )}
            </Container>
        </Layout>
    );
}

export async function getStaticProps(context) {
    const data = await getPostAndMorePosts(
        context.params.slug,
        context.preview ? context.previewData?.previewToken : undefined
    );
    return {
        props: {
            post: data.post,
            morePosts: data.morePosts,
        },
    };
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug();

    const paths = allPosts.map((post) => ({
        params: { slug: post.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}
