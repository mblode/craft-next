import { getPostBySlug } from '../../lib/api';

export default async (req, res) => {
    // (1)
    // Check for the right query params
    if (!req.query['x-craft-live-preview'] || !req.query.slug) {
        return res.status(401).json({ message: 'Not allowed to access this route' });
    }

    console.log(req.query.slug);

    // (2)
    // Get the url from Craft for the specific entry
    const data = await getPostBySlug(req.query.slug);

    console.log(data.url);

    if (!data.url) {
        return res.status(404).json({
            message: `URL of the entry "${req.query.slug}" could not be fetched`,
        });
    }

    // (3)
    // Set the token as preview data
    res.setPreviewData({
        previewToken: req.query.token ?? null,
    });

    // (4)
    const parsedUrl = new URL(data.url);

    // Redirect to the path from the fetched url
    res.writeHead(307, { Location: parsedUrl.pathname });

    res.end('Preview mode enabled');
};
