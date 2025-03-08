export interface GoldPrice {
  timestamp: string;
  price: number;
  currency: string;
}

export interface HistoricalData {
  date: string;
  price: number;
}

// export interface NewsItem {
//   id: string;
//   title: string;
//   summary: string;
//   source: string;
//   url: string;
//   publishedAt: string;
//   imageUrl?: string;
// }



export interface NewsItem {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
  imageUrl?: string;
  summary?: string;
}
