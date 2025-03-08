"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function LivePriceClient() {
  const mainCurrencies = ["USD", "EUR", "GBP", "JPY"];
  const allCurrencies = ["USD", "EUR", "GBP", "JPY", "INR", "AUD", "CAD", "SGD", "CHF", "CNY"];
  const [currency, setCurrency] = useState<string>("USD");
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [goldPriceUSD, setGoldPriceUSD] = useState<number | null>(null);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const res = await fetch("/api/currency");
        if (!res.ok) throw new Error("Failed to fetch exchange rates");

        const data = await res.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    }

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    async function fetchGoldPrice() {
      try {
        const response = await fetch("https://api.gold-api.com/price/XAU");
        if (!response.ok) throw new Error("Failed to fetch gold price");

        const result = await response.json();
        if (!result || !result.price) throw new Error("Invalid API response");

        setGoldPriceUSD(parseFloat(result.price));
      } catch (error) {
        console.error("Error fetching gold price:", error);
      }
    }

    fetchGoldPrice();
    const interval = setInterval(fetchGoldPrice, 120000);
    return () => clearInterval(interval);
  }, []);

  const convertPrice = (usdPrice: number | null) => {
    if (!usdPrice) return "Loading...";
    return exchangeRates[currency] ? (usdPrice * exchangeRates[currency]).toFixed(2) : "Updating...";
  };

  return (
    <Card className="w-full md:w-2/3">
      <CardHeader>
        <CardTitle>Currency Conversion</CardTitle>
        <CardDescription>View gold prices in different currencies</CardDescription>
        <Tabs defaultValue="USD" className="w-full" onValueChange={setCurrency}>
          <div className="flex w-full max-w-[600px] items-center gap-x-2">
            <TabsList className="flex flex-wrap gap-2">
              {mainCurrencies.map((cur) => (
                <TabsTrigger key={cur} value={cur}>{cur}</TabsTrigger>
              ))}
            </TabsList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center ml-2">
                  More <ChevronDown className="ml-1 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {allCurrencies.filter(cur => !mainCurrencies.includes(cur)).map((cur) => (
                  <DropdownMenuItem key={cur} onClick={() => setCurrency(cur)}>{cur}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Troy Ounce</p>
            <p className="text-2xl font-bold">{convertPrice(goldPriceUSD)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Gram</p>
            <p className="text-2xl font-bold">{convertPrice(goldPriceUSD ? goldPriceUSD / 31.1035 : null)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Kilogram</p>
            <p className="text-2xl font-bold">{convertPrice(goldPriceUSD ? goldPriceUSD * 32.1507 : null)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tola (India)</p>
            <p className="text-2xl font-bold">{convertPrice(goldPriceUSD ? goldPriceUSD / 1.066 : null)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
