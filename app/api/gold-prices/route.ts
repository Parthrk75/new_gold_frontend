import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "gold-prices.json");

export async function GET() {
  try {
    console.log("Fetching live gold price...");
    const response = await fetch("https://api.gold-api.com/price/XAU");
    if (!response.ok) throw new Error("Failed to fetch live gold prices");

    const result = await response.json();
    if (!result || !result.price || !result.updatedAt) throw new Error("Invalid API response");

    const gold24k = parseFloat(result.price);
    if (isNaN(gold24k)) throw new Error("Invalid gold price data");

    // Convert to different karats
    const newPrices = [
      { karat: "24K", price: gold24k },
      { karat: "22K", price: gold24k * 0.9167 },
      { karat: "18K", price: gold24k * 0.75 },
      { karat: "14K", price: gold24k * 0.5833 },
    ];

    // Load previous data
    let prevPrices: any = { prices: [], updatedAt: null };
    if (fs.existsSync(dataFile)) {
      prevPrices = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    }

    // Calculate price change
    const updatedPrices = newPrices.map((price, index) => {
      const lastPrice = prevPrices.prices[index]?.price || price.price;
      const change = price.price - lastPrice;
      const changePercent = lastPrice !== 0 ? (change / lastPrice) * 100 : 0;

      return { ...price, change, changePercent };
    });

    // Save new data to file
    fs.writeFileSync(dataFile, JSON.stringify({ prices: updatedPrices, updatedAt: result.updatedAt }, null, 2));

    return NextResponse.json({ prices: updatedPrices, updatedAt: result.updatedAt });
  } catch (error) {
    console.error("Error fetching live prices:", error);
    return NextResponse.json({ error: "Failed to fetch gold prices" }, { status: 500 });
  }
}
