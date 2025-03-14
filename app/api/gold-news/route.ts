import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET() {
  try {
    // Define queries
    const queries = ["Gold", "Gold Price", "Gold Investment"];

    // Fetch news for each query
    const newsResults = await Promise.all(
      queries.map(async (query) => {
        try {
          const news = await yahooFinance.search(query);
          return news?.news || []; // Return news array or empty array
        } catch (error) {
          console.error(`Error fetching news for query: ${query}`, error);
          return [];
        }
      })
    );

    // Merge all results and remove duplicates
    const uniqueArticles = Array.from(
      new Map(
        newsResults.flat().map((item) => [item.uuid, item]) // Remove duplicates by UUID
      ).values()
    );

    // Format the response
    const articles = uniqueArticles.map((item) => ({
      title: item.title || "No title available",
      link: item.link || "#",
      pubDate: item.providerPublishTime
        ? new Date(item.providerPublishTime).toISOString()
        : "No date available",
      source: item.publisher || "Unknown source",
    }));

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching Yahoo Finance gold news:", error);
    return NextResponse.json({ error: "Failed to fetch gold news" }, { status: 500 });
  }
}
