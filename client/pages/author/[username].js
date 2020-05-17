import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import MoreStories from '../../components/more-stories';
import Header from '../../components/header';
import Layout from '../../components/layout';
import { getAllAuthorsWithUsername, getAuthorPosts } from '../../lib/api';
import PostTitle from '../../components/post-title';

export default function Author({ author, posts }) {
    const router = useRouter();
    if (!router.isFallback) {
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
                                <title>{author.fullName} | Craft Next</title>
                            </Head>
                        </article>
                        {posts && posts.length > 0 && <MoreStories posts={posts} />}
                    </>
                )}
            </Container>
        </Layout>
    );
}

export async function getStaticProps(context) {
    const data = await getAuthorPosts(context.params.id);
    return {
        props: {
            posts: data,
        },
    };
}

export async function getStaticPaths() {
    const allAuthors = await getAllAuthorsWithUsername();

    const paths = allAuthors.map((item) => ({
        params: { username: item.username, id: item.id },
    }));

    return {
        paths,
        fallback: false,
    };
}
