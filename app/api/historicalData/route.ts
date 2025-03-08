import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

// Define CSV data structure
interface GoldPriceRecord {
    Date: string;
    Close: number;
}

// Function to read and parse the CSV
function readCSV(): GoldPriceRecord[] {
    const filePath = path.join(process.cwd(), "public", "data", "historical_gold_spot_prices.csv");

    console.log("📂 Checking file path:", filePath);

    if (!fs.existsSync(filePath)) {
        console.error("❌ File not found:", filePath);
        return [];
    }

    console.log("✅ File found. Reading...");

    const fileContent = fs.readFileSync(filePath, "utf8");

    console.log("✅ File read successfully. Size:", fileContent.length);

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });

    console.log("✅ Parsed", records.length, "records");

    return records.map((record: any) => ({
        Date: record.Date.trim(),  // Ensure correct date format
        Close: parseFloat(record["Close (Spot Price USD)"]) || 0  // Convert Close price to number
    }));
}

// ✅ API Route Handler (Returns All Data)
export async function GET(): Promise<NextResponse> {
    try {
        console.log("📡 API Request received");

        const records = readCSV();

        if (!records.length) {
            console.log("⚠️ No data available.");
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }

        console.log(`✅ Returning ${records.length} records`);

        return NextResponse.json({ historicalData: records }, { status: 200 });

    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
