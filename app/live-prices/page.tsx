"use client";

import { PriceCard } from "@/components/price-card";
import { PriceChart } from "@/components/price-chart";
import { MarketStats } from "@/components/market-stats";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function LivePricesPage() {
  const [currency, setCurrency] = useState<string>("USD");
  
  return (
    <div>
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Live Gold Prices</h1>
          <p className="text-muted-foreground max-w-2xl">
            Track real-time gold prices and market statistics. Our data is updated every few seconds to give you the most current information.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3">
            <PriceCard />
          </div>
          
          <Card className="w-full md:w-2/3">
            <CardHeader>
              <CardTitle>Currency Conversion</CardTitle>
              <CardDescription>
                View gold prices in different currencies
              </CardDescription>
              <Tabs defaultValue="USD" className="w-full" onValueChange={setCurrency}>
                <TabsList className="grid w-full max-w-[400px] grid-cols-4">
                  <TabsTrigger value="USD">USD</TabsTrigger>
                  <TabsTrigger value="EUR">EUR</TabsTrigger>
                  <TabsTrigger value="GBP">GBP</TabsTrigger>
                  <TabsTrigger value="JPY">JPY</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Troy Ounce</p>
                  <p className="text-2xl font-bold">
                    {currency === "USD" && "$2,345.67"}
                    {currency === "EUR" && "€2,156.32"}
                    {currency === "GBP" && "£1,876.45"}
                    {currency === "JPY" && "¥352,678"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gram</p>
                  <p className="text-2xl font-bold">
                    {currency === "USD" && "$75.42"}
                    {currency === "EUR" && "€69.33"}
                    {currency === "GBP" && "£60.34"}
                    {currency === "JPY" && "¥11,343"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kilogram</p>
                  <p className="text-2xl font-bold">
                    {currency === "USD" && "$75,420"}
                    {currency === "EUR" && "€69,330"}
                    {currency === "GBP" && "£60,340"}
                    {currency === "JPY" && "¥11,343,000"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tola (India)</p>
                  <p className="text-2xl font-bold">
                    {currency === "USD" && "$879.63"}
                    {currency === "EUR" && "€808.62"}
                    {currency === "GBP" && "£703.67"}
                    {currency === "JPY" && "¥132,254"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Market Statistics</h2>
        <MarketStats />
        
        <div className="mt-8">
          <PriceChart />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}