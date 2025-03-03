import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { getMarketNews } from "@/lib/data";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function NewsPage() {
  const news = getMarketNews();
  
  // Duplicate news items to create a longer list for the page
  const extendedNews = [...news, ...news.map(item => ({...item, id: `extended-${item.id}`}))];
  
  return (
    <div>
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Gold Market News</h1>
          <p className="text-muted-foreground max-w-2xl">
            Stay updated with the latest news and insights about the gold market, price movements, and industry trends.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {extendedNews.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col h-full">
              {item.imageUrl && (
                <div className="relative h-48 w-full">
                  <img 
                    src={item.imageUrl}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader className={item.imageUrl ? "pt-4" : ""}>
                <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                <CardDescription>{item.source} • {new Date(item.publishedAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{item.summary}</p>
              </CardContent>
              <CardFooter>
                <Link 
                  href={item.url} 
                  className="text-primary hover:underline inline-flex items-center"
                >
                  Read full article
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}