import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

// const ETF_SYMBOLS = ["GLD", "IAU", "SGOL"];

const ETF_SYMBOLS = [
    "GLD",  // SPDR Gold Shares
    "IAU",  // iShares Gold Trust
    "SGOL", // Aberdeen Standard Physical Gold Shares ETF
    "GDX",  // VanEck Vectors Gold Miners ETF
    "GDXJ", // VanEck Vectors Junior Gold Miners ETF
    "PHYS", // Sprott Physical Gold Trust
    "BAR",  // GraniteShares Gold Trust
    "AAAU", // Goldman Sachs Physical Gold ETF
    "UGL",  // ProShares Ultra Gold (2x Leverage)
    "DGL"   // Invesco DB Gold Fund
  ];
  
export async function GET() {
  try {
    const etfData = await Promise.all(
      ETF_SYMBOLS.map(async (symbol) => {
        try {
          const result = await yahooFinance.quote(symbol);
          return {
            symbol: result.symbol,
            name: result.shortName,
            price: result.regularMarketPrice,
            change: result.regularMarketChange,
            changePercent: result.regularMarketChangePercent,
            volume: result.regularMarketVolume ? result.regularMarketVolume.toLocaleString() : "N/A",
          };
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error);
          return null;
        }
      })
    );

    const validData = etfData.filter((etf) => etf !== null);
    return NextResponse.json(validData);
  } catch (error) {
    console.error("Error fetching Gold ETFs:", error);
    return NextResponse.json({ error: "Failed to fetch ETF data" }, { status: 500 });
  }
}
