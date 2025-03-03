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
  const [prices, setPrices] = useState<KaratPrice[]>([
    { karat: "24K", price: 2345.67, change: 12.45, changePercent: 0.53 },
    { karat: "22K", price: 2150.32, change: 11.42, changePercent: 0.53 },
    { karat: "18K", price: 1759.25, change: 9.34, changePercent: 0.53 },
    { karat: "14K", price: 1370.54, change: 7.28, changePercent: 0.53 }
  ]);
  
  useEffect(() => {
    // Simulate price updates every 8 seconds
    const interval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map(price => {
          const randomChange = (Math.random() * 10 - 5);
          const newPrice = price.price + randomChange;
          const changePercent = (randomChange / price.price) * 100;
          
          return {
            ...price,
            price: newPrice,
            change: randomChange,
            changePercent: changePercent
          };
        })
      );
    }, 8000);
    
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