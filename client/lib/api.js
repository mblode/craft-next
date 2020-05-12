import 'isomorphic-unfetch';

const GRAPHQL_API_URL = process.env.NEXT_CRAFT_API_URL;
export const API_TOKEN = process.env.NEXT_CRAFT_API_TOKEN;

async function fetchAPI(query, { previewToken } = {}) {
    let craftUrl = GRAPHQL_API_URL;

    if (previewToken && previewToken !== '') {
        craftUrl += '?token=' + previewToken;
    }

    const res = await fetch(craftUrl, {
        method: 'post',
        body: query,
        headers: {
            'Content-Type': 'application/graphql',
            Authorization: `Bearer ${API_TOKEN}`,
        },
    });

    if (res.status !== 200) {
        console.log(await res.text());
        throw new Error('Failed to fetch API');
    }

    const json = await res.json();

    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }
    return json.data;
}

export async function getAllPostsWithSlug() {
    const data = await fetchAPI(`
        {
            entries (section: "blog") {
                slug
            }
        }
    `);
    return data.entries;
}

export async function getAllPostsForHome(previewData) {
    const data = await fetchAPI(
        `
        {
            entries (section: "blog") {
                dateCreated @formatDateTime (format: "Y-m-d")
                title
                slug
                url
                ... on blog_blog_Entry {
                    richText
                    coverImage {
                        title
                        url @transform (handle: "thumb")
                    }
                }
            }
        }
        `,
        { previewData }
    );

    return data.entries;
}

export async function getPostAndMorePosts(slug, previewData) {
    const data = await fetchAPI(
        `
        query($slug: [String]) {
            post: entry (slug: $slug) {
                dateCreated @formatDateTime (format: "Y-m-d")
                title
                slug
                url
                ... on blog_blog_Entry {
                    richText
                    coverImage {
                        title
                        url @transform (handle: "thumb")
                    }
                }
            }

            morePosts: entries(section: "blog", limit: 3) {
                dateCreated @formatDateTime (format: "Y-m-d")
                title
                slug
                url
                ... on blog_blog_Entry {
                    richText
                    coverImage {
                        title
                        url @transform (handle: "thumb")
                    }
                }
            }
        }
        `,
        {
            previewData,
        }
    );

    data.morePosts = data.morePosts.filter((post) => post.slug !== slug).slice(0, 2);

    return data;
}

export async function getPostBySlug(slug) {
    const data = await fetchAPI(
        `
        query($slug: [String]) {
            post: entry (slug: $slug) {
                url
            }
        }
        `
    );

    return data.post;
}
