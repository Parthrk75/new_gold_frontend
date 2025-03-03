export async function GET(): Promise<Response> {
    try {
        console.log("Fetching live Gold Price data...");

        // Fetch Live Gold Price from external API
        const response: Response = await fetch("https://api.gold-api.com/price/XAU");
        if (!response.ok) {
            throw new Error("Failed to fetch gold price");
        }
        
        const data: { price?: string } = await response.json();
        if (!data || !data.price) {
            throw new Error("Invalid data format");
        }

        const goldPrice: string = parseFloat(data.price).toFixed(2); // Round off to two decimal places
        console.log("Gold Price:", goldPrice);

        return new Response(JSON.stringify({ goldPrice }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error fetching gold price:", errorMessage);
        
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
