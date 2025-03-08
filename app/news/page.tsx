"use client";

import { useEffect, useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getMarketNews } from "@/lib/data";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { NewsSection } from "@/components/news-section";

export default function NewsPage() {
  

  return (
    <div>
      {/* Header Section */}
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Gold Market News</h1>
          <p className="text-muted-foreground max-w-2xl">
            Stay updated with the latest news and insights about the gold market, price movements, and industry trends.
          </p>
        </div>
      </div>

           <NewsSection />
     
     
    </div>
  );
}
