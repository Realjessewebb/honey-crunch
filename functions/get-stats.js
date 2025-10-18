/**
 * Cloudflare Pages Function to retrieve analytics statistics
 * Returns visit and click counts from Workers KV
 */

export async function onRequestGet(context) {
    try {
        const { ANALYTICS } = context.env;

        // Get both visit and click counts
        const visits = await ANALYTICS.get('visits');
        const clicks = await ANALYTICS.get('clicks');

        return new Response(JSON.stringify({
            success: true,
            visits: visits ? parseInt(visits) : 0,
            clicks: clicks ? parseInt(clicks) : 0,
            timestamp: new Date().toISOString()
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        });

    } catch (error) {
        console.error('Error retrieving stats:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message,
            visits: 0,
            clicks: 0
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// Handle CORS preflight requests
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
