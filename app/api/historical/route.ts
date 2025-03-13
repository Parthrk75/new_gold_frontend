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
    const symbol = "GLD"; // Using GLD ETF as a proxy for gold prices
    const period1 = new Date("2020-01-01").toISOString().split("T")[0]; // Start date
    const period2 = new Date().toISOString().split("T")[0]; // End date (Today)

    const queryOptions = {
      period1,
      period2,
      interval: "1d" as "1d" | "1wk" | "1mo"
    };

    // Fetch historical data from Yahoo Finance
    const historicalData = await yahooFinance.historical(symbol, queryOptions);

    if (!historicalData || historicalData.length === 0) {
      return NextResponse.json({ error: "No historical data available" }, { status: 404 });
    }

    // Apply scaling factor to convert ETF price to gold spot price
    const scalingFactor = 10.77;
    const formattedData = historicalData.map((entry) => ({
      Date: new Date(entry.date).toISOString().split("T")[0], // Format date as YYYY-MM-DD
      "Open (Spot Price USD)": entry.open ? (entry.open * scalingFactor).toFixed(2) : null,
      "High (Spot Price USD)": entry.high ? (entry.high * scalingFactor).toFixed(2) : null,
      "Low (Spot Price USD)": entry.low ? (entry.low * scalingFactor).toFixed(2) : null,
      "Close (Spot Price USD)": entry.close ? (entry.close * scalingFactor).toFixed(2) : null
    }));

    return NextResponse.json({ historicalData: formattedData });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 });
  }
}
