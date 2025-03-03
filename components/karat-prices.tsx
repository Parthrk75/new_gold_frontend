"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

interface KaratPrice {
  karat: string;
  price: number;
  change: number;
  changePercent: number;
}

export function KaratPrices() {
  const [prices, setPrices] = useState<KaratPrice[]>([]);
  const [lastPrices, setLastPrices] = useState<KaratPrice[]>([]);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch("/api/gold-price");
        if (!response.ok) throw new Error("Failed to fetch gold prices");
        
        const result = await response.json();
        if (!result || !result.goldPrice) throw new Error("Invalid API response");

        const gold24k = parseFloat(result.goldPrice);
        const gold22k = gold24k * 0.9167;
        const gold18k = gold24k * 0.75;
        const gold14k = gold24k * 0.5833;

        const newPrices = [
          { karat: "24K", price: gold24k, change: 0, changePercent: 0 },
          { karat: "22K", price: gold22k, change: 0, changePercent: 0 },
          { karat: "18K", price: gold18k, change: 0, changePercent: 0 },
          { karat: "14K", price: gold14k, change: 0, changePercent: 0 }
        ];

        setPrices(prevPrices => {
          if (prevPrices.length === 0) return newPrices;
          return newPrices.map((price, index) => {
            const lastPrice = prevPrices[index].price;
            const change = price.price - lastPrice;
            const changePercent = (change / lastPrice) * 100;
            return { ...price, change, changePercent };
          });
        });
      } catch (error) {
        console.error("Error fetching live prices:", error);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {prices.map((price) => (
        <Card key={price.karat} className="overflow-hidden">
          <CardHeader className="pb-2 bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20">
            <CardTitle className="text-lg font-medium">{price.karat} Gold</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">${price.price.toFixed(2)}</div>
              <div className={`flex items-center ${price.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {price.change >= 0 ? 
                  <ArrowUp className="h-4 w-4 mr-1" /> : 
                  <ArrowDown className="h-4 w-4 mr-1" />
                }
                <span className="text-sm font-medium">
                  {Math.abs(price.change).toFixed(2)} ({Math.abs(price.changePercent).toFixed(2)}%)
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Per troy ounce • Updated {new Date().toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
