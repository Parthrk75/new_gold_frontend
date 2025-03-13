// import { NextResponse } from "next/server";
// import yahooFinance from "yahoo-finance2";

// export async function GET() {
//   try {
//     const symbol = "GC=F"; // Gold Futures Symbol
//     const queryOptions = { 
//       period1: "2023-01-01", 
//       period2: new Date().toISOString(), 
//       interval: "1d" as "1d" | "1wk" | "1mo"  // ✅ Fix TypeScript error
//     };

//     const historicalData = await yahooFinance.historical(symbol, queryOptions);

//     return NextResponse.json({ historicalData });
//   } catch (error) {
//     console.error("Error fetching historical data:", error);
//     return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET() {
  try {
    const symbol = "GLD"; // ETF for gold
    const period1 = "2020-01-01"; // Start date
    const period2 = new Date().toISOString().split("T")[0]; // Current date

    const queryOptions = { 
      period1, 
      period2, 
      interval: "1d" as "1d" 
    };

    // Fetch historical data
    const rawData = await yahooFinance.historical(symbol, queryOptions);

    if (!rawData || rawData.length === 0) {
      throw new Error("No historical data available.");
    }

    // Apply the 10.77 scaling factor
    const scalingFactor = 10.77;
    const formattedData = rawData.map((entry) => ({
      date: entry.date, // Keep date as returned by Yahoo Finance
      open: entry.open ? entry.open * scalingFactor : null,
      high: entry.high ? entry.high * scalingFactor : null,
      low: entry.low ? entry.low * scalingFactor : null,
      close: entry.close ? entry.close * scalingFactor : null,
      volume: entry.volume ?? null, // Keep volume as is
    }));

    return NextResponse.json({ historicalData: formattedData });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 });
  }
}
