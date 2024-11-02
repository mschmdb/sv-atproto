import { AtpAgent } from '@atproto/api';
import { ATP_SERVICE, ATP_IDENTIFIER } from '$env/static/private';

const atpAgent = new AtpAgent({
    service: ATP_SERVICE,
});

// Transform raw post data to the required format
/**
 * @param {{ uri: string, cid: string, value: { title?: string, content?: string, createdAt?: string } }} param0
 */
function whtwndBlogEntryRecordToView({ uri, cid, value }) {
    return {
        uri,
        cid,
        title: value.title || 'Untitled',
        content: value.content || '',
        createdAt: value.createdAt || new Date().toISOString(),
    };
}

export async function getPosts() {
    const repo = ATP_IDENTIFIER;

    // Fetch posts from the specified collection in WhiteWind
    const res = await atpAgent.com.atproto.repo.listRecords({
        collection: 'com.whtwnd.blog.entry',
        repo,
    });

    if (!res.success) {
        throw new Error('Failed to get posts.');
    }

    // Transform and return posts in a JSON-serializable format
    return res.data.records.map((data) =>
        whtwndBlogEntryRecordToView({
            uri: data.uri,
            cid: data.cid?.toString() || '',
            value: data.value,
        })
    );
}
