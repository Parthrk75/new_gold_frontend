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
    const symbol = "GC=F"; // Gold Futures Symbol
    const period1 = new Date("2023-01-01").toISOString().split("T")[0]; // Format YYYY-MM-DD
    const period2 = new Date().toISOString().split("T")[0]; // Ensure same format

    const queryOptions = { 
      period1, 
      period2, 
      interval: "1d" as "1d" | "1wk" | "1mo" 
    };

    const historicalData = await yahooFinance.historical(symbol, queryOptions);

    // Debug: Log data to check if March 13 is present
    console.log("Fetched Data:", historicalData);

    // Ensure sorting by date (if needed)
    const sortedData = historicalData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({ historicalData: sortedData });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 });
  }
}
