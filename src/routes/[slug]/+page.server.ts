import { getPosts } from '$lib/atprotoClient';

export const config = {
    isr: {
        expiration: 60,
    },
};

// Load function to fetch a single blog post based on the slug
export async function load({ params }) {
    const { slug } = params;

    // Fetch all posts (or implement a dedicated API call for a single post if available)
    const blogs = await getPosts();

    // Find the specific blog post by matching the slug to the URI
    const blog = blogs.find((post) => post.uri.endsWith(slug));

    if (!blog) {
        throw new Error('Blog post not found');
    }


    return {
        props: { blog }
    };
}
