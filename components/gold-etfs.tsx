"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ETF {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export function GoldETFs() {
  const [etfs, setETFs] = useState<ETF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchETFs() {
      try {
        const response = await fetch("/api/gold-etfs");
        if (!response.ok) throw new Error("Failed to fetch ETF data");
        
        const data = await response.json();
        setETFs(data);
      } catch (error) {
        console.error("Error fetching ETFs:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchETFs();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gold ETFs</CardTitle>
        <CardDescription>Top gold-backed exchange-traded funds</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading ETF data...</p>
        ) : error ? (
          <p className="text-red-500">Error loading data</p>
        ) : (
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Symbol</th>
                  <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Company</th>
                  <th className="py-3 px-4 text-right font-medium">Price</th>
                  <th className="py-3 px-4 text-right font-medium">Change</th>
                  <th className="py-3 px-4 text-right font-medium hidden md:table-cell">Volume</th>
                </tr>
              </thead>
              <tbody>
                {etfs.map((etf) => (
                  <tr key={etf.symbol} className="border-b">
                    <td className="py-3 px-4 font-medium">{etf.symbol}</td>
                    <td className="py-3 px-4 hidden md:table-cell">{etf.name}</td>
                    <td className="py-3 px-4 text-right">${etf.price.toFixed(2)}</td>
                    <td className={`py-3 px-4 text-right ${etf.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      <div className="flex items-center justify-end">
                        {etf.change >= 0 ? 
                          <ArrowUp className="h-4 w-4 mr-1" /> : 
                          <ArrowDown className="h-4 w-4 mr-1" />
                        }
                        <span>
                          {etf.change.toFixed(2)} ({etf.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right hidden md:table-cell">{etf.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2 text-right">
          *Market data delayed by at least 15 minutes
        </p>
      </CardContent>
    </Card>
  );
}
