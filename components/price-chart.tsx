"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PriceChart() {
  const [data, setData] = useState<{ date: Date; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d' | '60d' | '365d' | '1825d'>('7d');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/historicalData");
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();

        const formattedData = result.historicalData
          .map((item: { Date: string; Close: number }) => {
            const [day, month, year] = item.Date.split(" ")[0].split("-");
            return {
              date: new Date(`${year}-${month}-${day}`),
              price: item.Close,
            };
          })
          .sort((a: { date: { getTime: () => number; }; }, b: { date: { getTime: () => number; }; }) => b.date.getTime() - a.date.getTime());

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredData =
    timeframe === '7d' ? data.slice(0, 7) : 
    timeframe === '14d' ? data.slice(0, 14) : 
    timeframe === '30d' ? data.slice(0, 30) : 
    timeframe === '60d' ? data.slice(0, 60) : 
    timeframe === '365d' ? data.slice(0, 365) : 
    timeframe === '1825d' ? data.slice(0, 1825) : 
    data;

  return (
    <Card className="col-span-3 min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Gold Price History</CardTitle>
        <CardDescription>Historical gold prices (USD/oz)</CardDescription>
        <Tabs defaultValue="7d" className="w-full" onValueChange={(value) => setTimeframe(value as '7d' | '14d' | '30d' | '60d' | '365d' | '1825d')}>
          <TabsList className="grid w-full max-w-[600px] grid-cols-6">
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="14d">14D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            <TabsTrigger value="60d">60D</TabsTrigger>
            <TabsTrigger value="365d">1Y</TabsTrigger>
            <TabsTrigger value="1825d">5Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading table data...</p>
        ) : error ? (
          <p className="text-red-500">Error loading data</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="">
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2">{item.date.toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">${item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}