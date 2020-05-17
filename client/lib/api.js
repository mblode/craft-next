export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

async function fetchAPI(query, { previewData, variables } = {}) {
    let craftUrl = API_URL;

    if (previewData && previewData !== '') {
        craftUrl += '?token=' + previewData;
    }

    const res = await fetch(craftUrl, {
        method: 'POST',
        body: JSON.stringify({
            query,
            variables,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
        },
    });

    if (res.status !== 200) {
        console.log(await res.text());
        throw new Error('Failed to fetch API');
    }

    const json = await res.json();

    console.log(json.data);

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

export async function getAllAuthorsWithUsername() {
    const data = await fetchAPI(`
        {
            users {
                id
                username
                fullName
                photo {
                    title
                    url @transform (handle: "thumb")
                }
            }
        }
    `);
    return data.users;
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
                    username
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

export async function getAllCategories() {
    const data = await fetchAPI(
        `
        {
            blog: categories(group: "blogTag") {
                title
                id
            }

            countries: categories(group: "countryTag") {
                title
                id
            }
        }
        `
    );

    return data;
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
                    username
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
                    username
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

export async function searchEntries(variables) {
    const data = await fetchAPI(
        `
        query($query: String, $id: [Int]) {
            entries (search: $query, relatedToAll: $id) {
                dateCreated @formatDateTime (format: "Y-m-d")
                title
                slug
                url
                author {
                    username
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
            variables,
        }
    );

    return data.entries;
}

export async function getAuthorPosts(id) {
    const data = await fetchAPI(
        `
        query($id: [QueryArgument]) {
            entries (authorId: $id) {
                dateCreated @formatDateTime (format: "Y-m-d")
                title
                slug
                url
                author {
                    username
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
            variables: {
                id,
            },
        }
    );

    return data.entries;
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
            variables: {
                slug,
            },
        }
    );

    return data.post;
}

export async function saveEntry(title) {
    const data = await fetchAPI(
        `
        mutation saveEntry($title: String) {
            post: save_blog_blog_Entry(title: $title, authorId: 1, enabled: true) {
                dateCreated @formatDateTime (format: "Y-m-d")
                title
                slug
                url
                author {
                    username
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

    return data.post;
}
