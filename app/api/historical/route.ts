import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET() {
  try {
    const symbol = "GC=F"; // Gold Futures Symbol
    const queryOptions = { 
      period1: "2023-01-01", 
      period2: new Date().toISOString(), 
      interval: "1d" as "1d" | "1wk" | "1mo"  // ✅ Fix TypeScript error
    };

    const historicalData = await yahooFinance.historical(symbol, queryOptions);

    return NextResponse.json({ historicalData });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 });
  }
}

