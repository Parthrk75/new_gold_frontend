"use client";
import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface HistoricalDataItem {
  date: string | null;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
}

export  function PriceChart() {
  const [data, setData] = useState<HistoricalDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<number>(7);
  const [view, setView] = useState<string>("chart");

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
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-black text-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Gold Price History</h2>
      
      {/* Tabs for timeframe selection */}
      <Tabs defaultValue="7d" className="w-full mb-4" onValueChange={(value) => setDays(parseInt(value))}>
        <TabsList className="grid w-full max-w-[600px] grid-cols-7 bg-gray-800 rounded-md p-2">
          <TabsTrigger value="7">7D</TabsTrigger>
          <TabsTrigger value="14">14D</TabsTrigger>
          <TabsTrigger value="30">30D</TabsTrigger>
          <TabsTrigger value="60">60D</TabsTrigger>
          <TabsTrigger value="180">6M</TabsTrigger>
          <TabsTrigger value="365">1Y</TabsTrigger>
          <TabsTrigger value="1825">5Y</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Tabs for switching between Chart and Table View */}
      <Tabs defaultValue="chart" className="w-full mb-4" onValueChange={setView}>
        <TabsList className="grid w-full max-w-[300px] grid-cols-2 bg-gray-800 rounded-md p-2">
          <TabsTrigger value="chart">Chart View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        {/* Chart View */}
        <TabsContent value="chart">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip formatter={(value) => `$${value}`} />
                <Line type="monotone" dataKey="close" stroke="#FFD700" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </TabsContent>

        {/* Table View */}
        <TabsContent value="table">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : filteredData.length === 0 ? (
            <p className="text-gray-400">No data available for the selected range.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="border border-gray-600 p-2">Date</th>
                  <th className="border border-gray-600 p-2">Open</th>
                  <th className="border border-gray-600 p-2">High</th>
                  <th className="border border-gray-600 p-2">Low</th>
                  <th className="border border-gray-600 p-2">Close</th>
                  <th className="border border-gray-600 p-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="text-center border-t border-gray-600">
                    <td className="border border-gray-600 p-2">{new Date(item.date!).toLocaleDateString()}</td>
                    <td className="border border-gray-600 p-2">{item.open?.toFixed(2) ?? "N/A"}</td>
                    <td className="border border-gray-600 p-2">{item.high?.toFixed(2) ?? "N/A"}</td>
                    <td className="border border-gray-600 p-2">{item.low?.toFixed(2) ?? "N/A"}</td>
                    <td className="border border-gray-600 p-2 font-bold">{item.close?.toFixed(2) ?? "N/A"}</td>
                    <td className="border border-gray-600 p-2">{item.volume ?? "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
