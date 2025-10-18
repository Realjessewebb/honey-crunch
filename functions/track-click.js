/**
 * Cloudflare Pages Function to track "Order Now" button clicks
 * This increments the click counter in Workers KV
 */

export async function onRequestPost(context) {
    try {
        const { ANALYTICS } = context.env;

        // Parse the request body to get button information
        const body = await context.request.json();
        const buttonName = body.button || 'unknown';

        // For now, we're only tracking "order-now" clicks
        if (buttonName === 'order-now') {
            // Get current click count
            const currentCount = await ANALYTICS.get('clicks');
            const newCount = currentCount ? parseInt(currentCount) + 1 : 1;

            // Update the count in KV
            await ANALYTICS.put('clicks', newCount.toString());

            return new Response(JSON.stringify({
                success: true,
                clicks: newCount,
                button: buttonName
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        return new Response(JSON.stringify({
            success: false,
            error: 'Invalid button name'
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Error tracking click:', error);
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
