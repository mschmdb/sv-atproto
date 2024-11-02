import { getPosts } from '$lib/atprotoClient';

export const config = {
    isr: {
      expiration: 60,
    },
  };

export async function load() {
    const blogs = await getPosts();


    return {
        props: { blogs }
    };
}
