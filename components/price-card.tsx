"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoldPrice } from "@/lib/types";
import { useEffect, useState } from "react";
import { getCurrentGoldPrice } from "@/lib/data";
import { ArrowDown, ArrowUp } from "lucide-react";

export function PriceCard() {
  const [price, setPrice] = useState<GoldPrice | null>(null);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  
  useEffect(() => {
    // Initial price
    setPrice(getCurrentGoldPrice());
    
    // Update price every 5 seconds
    const interval = setInterval(() => {
      const newPrice = getCurrentGoldPrice();
      setPreviousPrice(price?.price || null);
      setPrice(newPrice);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []); // Remove the dependency on price.price to avoid infinite loop
  
  if (!price) return <Card className="h-[140px] animate-pulse" />;
  
  const priceChange = previousPrice ? price.price - previousPrice : 0;
  const isPositive = priceChange >= 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Current Gold Price</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold">${price.price.toFixed(2)}</div>
          {previousPrice && (
            <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              <span className="text-sm font-medium">
                {Math.abs(priceChange).toFixed(2)} ({(Math.abs(priceChange) / previousPrice * 100).toFixed(2)}%)
              </span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: {new Date(price.timestamp).toLocaleTimeString()}
        </p>
      </CardContent>
    </Card>
  );
}