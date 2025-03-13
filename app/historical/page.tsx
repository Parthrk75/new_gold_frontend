// "use client";

// import { PriceChart } from "@/components/price-chart";
// import Goldtable from "@/components/gold-table";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function HistoricalDataPage() {
//   return (
//     <div>
//       <div className="bg-muted py-12">
//         <div className="container">
//           <h1 className="text-4xl font-bold mb-4">Historical Gold Prices</h1>
//           <p className="text-muted-foreground max-w-2xl">
//             Analyze gold price trends over time with our comprehensive historical data.
//           </p>
//         </div>
//       </div>

//       <div className="container py-12">
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Data Filters</CardTitle>
//             <CardDescription>Customize your view of historical gold price data</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="mt-4 flex justify-end">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Export Data</button>
//             </div>
//           </CardContent>
//         </Card>

//         <Tabs defaultValue="chart" className="w-full">
//           <TabsList className="grid w-full max-w-[400px] grid-cols-2">
//             <TabsTrigger value="chart">Chart View</TabsTrigger>
//             <TabsTrigger value="table">Table View</TabsTrigger>
//           </TabsList>
//           <TabsContent value="chart" className="mt-4">
//             <PriceChart />
//           </TabsContent>
//           <TabsContent value="table" className="mt-4">
//                     <Goldtable/>
            
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }





"use client";
import { useState, useEffect, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HistoricalDataItem {
  date: string | null;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
}

export default function GoldPriceChart() {
  const [data, setData] = useState<HistoricalDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<number>(7); // Default: Last 7 days

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/historical?timestamp=${Date.now()}`);
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);

      const result = await response.json();
      if (!result.historicalData || !Array.isArray(result.historicalData)) {
        throw new Error("Invalid data format received.");
      }

      const sortedData = result.historicalData
        .filter((item: HistoricalDataItem) => item.date)
        .sort((a: HistoricalDataItem, b: HistoricalDataItem) =>
          new Date(a.date!).getTime() - new Date(b.date!).getTime()
        );

      setData(sortedData);
    } catch (err: any) {
      setError(err.message || "Error fetching data");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredData = useMemo(() => {
    if (!data.length) return [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return data.filter((item) => item.date && new Date(item.date) >= cutoffDate);
  }, [days, data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-black text-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Gold Price History</h2>

      {/* Tabs for selecting timeframe */}
      <Tabs defaultValue="chart" className="w-full mb-4">
        <TabsList className="grid w-full max-w-[600px] grid-cols-7 bg-gray-800 rounded-md p-2">
          <TabsTrigger value="7" className="text-gray-300 data-[state=active]:bg-gray-600 rounded-md px-4 py-2" onClick={() => setDays(7)}>7D</TabsTrigger>
          <TabsTrigger value="14" className="text-gray-300 data-[state=active]:bg-gray-600 rounded-md px-4 py-2" onClick={() => setDays(14)}>14D</TabsTrigger>
          <TabsTrigger value="30" className="text-gray-300 data-[state=active]:bg-gray-600 rounded-md px-4 py-2" onClick={() => setDays(30)}>30D</TabsTrigger>
          <TabsTrigger value="60" className="text-gray-300 data-[state=active]:bg-gray-600 rounded-md px-4 py-2" onClick={() => setDays(60)}>60D</TabsTrigger>
          <TabsTrigger value="180" className="text-gray-300 data-[state=active]:bg-gray-600 rounded-md px-4 py-2" onClick={() => setDays(180)}>6M</TabsTrigger>
          <TabsTrigger value="365" className="text-gray-300 data-[state=active]:bg-gray-600 rounded-md px-4 py-2" onClick={() => setDays(365)}>1Y</TabsTrigger>
          <TabsTrigger value="1825" className="text-gray-300 data-[state=active]:bg-gray-600 rounded-md px-4 py-2" onClick={() => setDays(1825)}>5Y</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Chart & Table View Toggle */}
      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 bg-gray-800 rounded-md p-2">
          <TabsTrigger value="chart" className="text-gray-300 data-[state=active]:bg-gray-600 rounded-md px-4 py-2">Chart View</TabsTrigger>
          <TabsTrigger value="table" className="text-gray-300 data-[state=active]:bg-gray-600 rounded-md px-4 py-2">Table View</TabsTrigger>
        </TabsList>

        {/* Chart View */}
        <TabsContent value="chart" className="mt-4 bg-gray-900 p-4 rounded-lg">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : filteredData.length === 0 ? (
            <p className="text-gray-400">No data available for the selected range.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line type="monotone" dataKey="close" stroke="#FFD700" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
