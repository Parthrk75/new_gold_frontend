import { GoldPrice, HistoricalData, NewsItem } from './types';

// Mock current gold price data
export const getCurrentGoldPrice = (): GoldPrice => {
  // In a real app, this would fetch from an API
  return {
    timestamp: new Date().toISOString(),
    price: 2350 + Math.random() * 20 - 10, // Random price around $2350
    currency: 'USD'
  };
};

// Mock historical data for the past 30 days
export const getHistoricalData = (): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Base price with some random variation to create a realistic chart
    const basePrice = 2300;
    const trend = i / 5; // Slight upward trend
    const randomVariation = Math.random() * 50 - 25;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: basePrice + trend + randomVariation
    });
  }
  
  return data;
};

// Mock news data
// export const getMarketNews = (): NewsItem[] => {
//   return [
//     {
//       id: '1',
//       title: 'Gold Prices Surge Amid Global Economic Uncertainty',
//       summary: 'Gold prices reached a new high today as investors seek safe-haven assets amid growing economic concerns.',
//       source: 'Financial Times',
//       url: '#',
//       publishedAt: '2025-04-15T09:30:00Z',
//       imageUrl: 'https://images.unsplash.com/photo-1610375461369-d613b564c5c3?q=80&w=2070&auto=format&fit=crop'
//     },
//     {
//       id: '2',
//       title: 'Central Banks Increase Gold Reserves',
//       summary: 'Several central banks have reported significant increases in their gold reserves as part of diversification strategies.',
//       source: 'Bloomberg',
//       url: '#',
//       publishedAt: '2025-04-14T14:15:00Z',
//       imageUrl: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=2070&auto=format&fit=crop'
//     },
//     {
//       id: '3',
//       title: 'Gold Mining Stocks Rally Following Production Reports',
//       summary: 'Major gold mining companies saw their stocks rise after reporting better-than-expected production figures for Q1 2025.',
//       source: 'Reuters',
//       url: '#',
//       publishedAt: '2025-04-13T11:45:00Z',
//       imageUrl: 'https://images.unsplash.com/photo-1624365169198-f1631dbc41ff?q=80&w=1000&auto=format&fit=crop'
//     },
//     {
//       id: '4',
//       title: 'Analysts Predict Gold to Reach $2,500 by Year End',
//       summary: 'Leading market analysts have revised their forecasts, predicting gold prices could reach $2,500 per ounce by the end of 2025.',
//       source: 'Wall Street Journal',
//       url: '#',
//       publishedAt: '2025-04-12T08:20:00Z'
//     }
//   ];
// };






export async function getMarketNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch("/api/gold-news");
    if (!res.ok) throw new Error("Failed to fetch news");

    const data = await res.json();
    return data.articles.map((article: any) => ({
      title: article.title,
      url: article.link,
      publishedAt: article.pubDate,
      source: article.source,
      imageUrl: article.imageUrl || "/placeholder.jpg", // Provide default image if none
      summary: article.summary || "No summary available.",
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
