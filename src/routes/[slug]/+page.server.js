import { getPosts } from '$lib/atprotoClient';

// Load function to fetch a single blog post based on the slug
export async function load({ params, setHeaders }) {
    const { slug } = params;

    // Fetch all posts (or implement a dedicated API call for a single post if available)
    const blogs = await getPosts();

    // Find the specific blog post by matching the slug to the URI
    const blog = blogs.find((post) => post.uri.endsWith(slug));

    if (!blog) {
        throw new Error('Blog post not found');
    }

    // Set ISR cache headers
    setHeaders({
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600' // 5 minutes cache, with 10 minutes revalidation
    });

    return {
        props: { blog }
    };
}
