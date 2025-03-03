import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

// Define the structure of the CSV data
interface GoldPriceRecord {
    Date: string;
    Close: number;
}

// Fetch historical data from CSV
export async function GET(): Promise<NextResponse> {
    try {
        console.log("Fetching historical gold price data...");

        // ✅ Correct file path
        const filePath = path.join(process.cwd(), "public", "data", "historical_gold_spot_prices.csv");

        console.log("Reading file from:", filePath);

        if (!fs.existsSync(filePath)) {
            console.error("File not found:", filePath);
            return NextResponse.json({ error: "CSV file not found" }, { status: 404 });
        }

        // ✅ Read and parse the CSV file
        const fileContent = fs.readFileSync(filePath, "utf8");
        console.log("File content read successfully");

        const records = parse(fileContent, {
            columns: true, // Auto-detect headers from the first row
            skip_empty_lines: true,
            trim: true // Removes extra spaces
        });

        console.log("Total records parsed:", records.length);

        // ✅ Extract only "Date" and "Close Price" safely
        const filteredRecords: GoldPriceRecord[] = records.map((record: any) => ({
            Date: record.Date,
            Close: parseFloat(record["Close (Spot Price USD)"]) || 0 // Ensure number format
        }));

        console.log(`Returning ${filteredRecords.length} records`);

        return NextResponse.json({ historicalData: filteredRecords }, { status: 200 });

    } catch (error) {
        console.error("Error fetching historical gold price data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

