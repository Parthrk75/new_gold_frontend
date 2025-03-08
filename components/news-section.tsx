// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { getMarketNews } from "@/lib/data";
// import { NewsItem } from "@/lib/types";
// import { ExternalLink } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export function NewsSection() {
//   const news = getMarketNews();
  
//   return (
//     <div className="py-12">
//       <div className="container">
//         <h2 className="text-3xl font-bold mb-8">Latest Gold Market News</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {news.map((item) => (
//             <NewsCard key={item.id} news={item} />
//           ))}
//         </div>
//         <div className="mt-8 text-center">
//           <Link 
//             href="/news" 
//             className="text-primary hover:underline inline-flex items-center"
//           >
//             View all market news
//             <ExternalLink className="ml-1 h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// function NewsCard({ news }: { news: NewsItem }) {
//   return (
//     <Card className="overflow-hidden flex flex-col h-full">
//       {news.imageUrl && (
//         <div className="relative h-48 w-full">
//           <img 
//             src={news.imageUrl}
//             alt={news.title}
//             className="object-cover w-full h-full"
//           />
//         </div>
//       )}
//       <CardHeader className={news.imageUrl ? "pt-4" : ""}>
//         <CardTitle className="line-clamp-2">{news.title}</CardTitle>
//         <CardDescription>{news.source} • {new Date(news.publishedAt).toLocaleDateString()}</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-grow">
//         <p className="text-sm text-muted-foreground line-clamp-3">{news.summary}</p>
//       </CardContent>
//       <CardFooter>
//         <Link 
//           href={news.url} 
//           className="text-sm text-primary hover:underline inline-flex items-center"
//         >
//           Read full article
//           <ExternalLink className="ml-1 h-3 w-3" />
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsItem } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchNews() {
      const res = await fetch("/api/gold-news");
      if (!res.ok) return;
      const data = await res.json();
      setNews(
        data.articles.map((article: any) => ({
          title: article.title,
          url: article.link,
          publishedAt: article.pubDate,
          source: article.source,
        }))
      );
    }
    fetchNews();
  }, []);

  return (
    <div className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Latest Gold Market News</h2>
        {/* Grid layout with 2 columns on medium screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <NewsCard key={index} news={item} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/news" className="text-primary hover:underline inline-flex items-center">
            View all market news
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ news }: { news: NewsItem }) {
  return (
    <Card className="flex flex-col justify-between p-4 w-full h-28 shadow-md border rounded-lg">
      <CardHeader className="p-0 space-y-1">
        <CardTitle className="text-lg font-semibold truncate">{news.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {news.source} • {new Date(news.publishedAt).toISOString().split("T")[0]}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-2 p-0">
        <Link href={news.url} target="_blank" className="text-primary text-sm hover:underline">
          Read full article →
        </Link>
      </CardFooter>
    </Card>
  );
}
