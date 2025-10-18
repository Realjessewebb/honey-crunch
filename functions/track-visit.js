/**
 * Cloudflare Pages Function to track page visits
 * This increments the visit counter in Workers KV
 */

export async function onRequestPost(context) {
    try {
        const { ANALYTICS } = context.env;

        // Get current visit count
        const currentCount = await ANALYTICS.get('visits');
        const newCount = currentCount ? parseInt(currentCount) + 1 : 1;

        // Update the count in KV
        await ANALYTICS.put('visits', newCount.toString());

        return new Response(JSON.stringify({
            success: true,
            visits: newCount
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error tracking visit:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message
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
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
