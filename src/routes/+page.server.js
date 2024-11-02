import { getPosts } from '$lib/atprotoClient';

export async function load({ setHeaders }) {
    const blogs = await getPosts();
    console.log(blogs);

    // Set ISR cache headers
    setHeaders({
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600' // 5 minutes cache, with 10 minutes revalidation
    });

    return {
        props: { blogs }
    };
}
