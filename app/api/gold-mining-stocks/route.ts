import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

// List of gold mining stock symbols
const goldMiningStocks = [
    "NEM",  // Newmont Corporation
    "GOLD", // Barrick Gold Corporation
    "AEM",  // Agnico Eagle Mines
    "FNV",  // Franco-Nevada Corporation
    "KGC",  // Kinross Gold Corporation
    "GFI",  // Gold Fields Limited
    "AU",   // AngloGold Ashanti Limited
    "WPM"   // Wheaton Precious Metals Corp.
  ];
  
export async function GET() {
  try {
    const stockData = await Promise.all(
      goldMiningStocks.map(async (symbol) => {
        try {
          const data = await yahooFinance.quote(symbol);
          return {
            symbol,
            name: data.shortName,
            price: data.regularMarketPrice,
            change: data.regularMarketChange,
            changePercent: data.regularMarketChangePercent,
            volume: data.regularMarketVolume,
          };
        } catch (error) {
          console.warn(`Skipping ${symbol}: No data found`);
          return null;
        }
      })
    );

    // Remove null values (failed stocks)
    const validStocks = stockData.filter((stock) => stock !== null);

    return NextResponse.json(validStocks);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
