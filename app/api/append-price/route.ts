import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// CSV file path
const CSV_FILE_PATH = path.join(process.cwd(), "public/data/historical_gold_spot_prices.csv");

// Function to format date as "DD-MM-YYYY HH:mm"
const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
};

// API Route (GET request)
export async function GET() {
    try {
        // Fetch data from external API
        const response = await fetch("https://api.gold-api.com/price/XAU");
        if (!response.ok) {
            throw new Error("Failed to fetch data from API");
        }

        const result = await response.json();
        const { price, updatedAt } = result;

        if (!price || !updatedAt) {
            return NextResponse.json({ error: "Invalid API response" }, { status: 400 });
        }

        // Format data for CSV
        const formattedDate = formatDate(updatedAt);
        const csvRow = `${formattedDate},${price},${price},${price},${price}\n`;

        // Append data to CSV file
        fs.appendFileSync(CSV_FILE_PATH, csvRow, "utf8");

        return NextResponse.json({ message: "Data appended successfully", data: csvRow.trim() });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch or write data" }, { status: 500 });
    }
}
