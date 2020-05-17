import { getPostBySlug } from '../../lib/api';

export default async (req, res) => {
    // (1)
    // Check for the right query params
    if (!req.query['x-craft-live-preview'] || !req.query.slug) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // (2)
    // Get the url from Craft for the specific entry
    const post = await getPostBySlug(req.query.slug);

    if (!post) {
        return res.status(401).json({ message: 'Invalid slug' });
    }

    // (3)
    // Set the token as preview data
    res.setPreviewData({
        previewToken: req.query.token ?? null,
    });

    // (4)
    const parsedUrl = new URL(post.url);

    // Redirect to the path from the fetched url
    res.writeHead(307, { Location: parsedUrl.pathname });

    res.end();
};
