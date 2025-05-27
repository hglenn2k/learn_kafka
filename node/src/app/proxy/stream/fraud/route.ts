const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000';

export async function GET() {
    try {
        const response = await fetch(`${BACKEND_URL}/stream/fraud`, {
            method: 'GET',
            headers: {
                'Accept': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

        if (!response.ok) {
            return new Response('Stream failed', { status: response.status });
        }

        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('Fraud stream failed:', error);
        return new Response('Stream error', { status: 500 });
    }
}