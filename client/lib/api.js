import 'isomorphic-unfetch';

export const API_URL = process.env.NEXT_CRAFT_API_URL;
export const API_TOKEN = process.env.NEXT_CRAFT_API_TOKEN;

async function fetchAPI(query, { previewToken, variables } = {}) {
    let craftUrl = API_URL;

    if (previewToken && previewToken !== '') {
        craftUrl += '?token=' + previewToken;
    }

    const res = await fetch(craftUrl, {
        method: 'POST',
        body: JSON.stringify({
            query,
            variables,
        }),
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
                author {
                    fullName
                    photo {
                        title
                        url @transform (handle: "thumb")
                    }
                }
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
                author {
                    fullName
                    photo {
                        title
                        url @transform (handle: "thumb")
                    }
                }
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
                author {
                    fullName
                    photo {
                        title
                        url @transform (handle: "thumb")
                    }
                }
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
            variables: {
                slug,
            },
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
        `,
        {
            previewData,
            variables: {
                slug,
            },
        }
    );

    return data.post;
}

export async function saveEntry(title) {
    console.log(title);

    const data = await fetchAPI(
        `
        mutation saveEntry($title: String) {
            post: save_blog_blog_Entry(title: "mutate", authorId: 1, enabled: false) {
                dateCreated @formatDateTime (format: "Y-m-d")
                title
                slug
                url
                author {
                    fullName
                    photo {
                        title
                        url @transform (handle: "thumb")
                    }
                }
            }
        }
        `,
        {
            variables: {
                title,
            },
        }
    );

    console.log(data.post);

    return data.post;
}
