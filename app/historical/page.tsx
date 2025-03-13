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

import { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes"; 

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface HistoricalDataItem {
  date: string;
  close: number;
}

interface ChartData {
  date: Date;
  price: number;
}

export default function GoldPriceChart() {
  const { theme } = useTheme(); 
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<"7d" | "14d" | "30d" | "60d" | "180d" | "365d" | "1825d">("7d");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch("/api/historicalData");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        const formattedData: ChartData[] = result.historicalData
          .map((item: HistoricalDataItem) => {
            const [year, month, day] = item.date.split("-");
            return {
              date: new Date(`${year}-${month}-${day}`),
              price: item.close,
            };
          })
          .sort((a: ChartData, b: ChartData) => a.date.getTime() - b.date.getTime());
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

  const timeframeMap: Record<typeof timeframe, number> = {
    "7d": 7,
    "14d": 14,
    "30d": 30,
    "60d": 60,
    "180d": 180,
    "365d": 365,
    "1825d": 1825,
  };

  const filteredData = useMemo(() => {
    return data.slice(-timeframeMap[timeframe]);
  }, [data, timeframe]);

  const formatDate = (date: Date): string =>
    date.toLocaleDateString("en-US", { day: "numeric", month: "short" });

  const textColor = theme === "dark" ? "#ffffff" : "#1f2937";
  const gridColor = theme === "dark" ? "#333333" : "#e5e5e5";
  const tooltipBg = theme === "dark" ? "#1f2937" : "#ffffff";

  const chartData = useMemo(
    () => ({
      labels: filteredData.map((item) => formatDate(item.date)),
      datasets: [
        {
          label: "Gold Price (USD)",
          data: filteredData.map((item) => item.price),
          borderColor: "#00FF57",
          borderWidth: 2,
          backgroundColor: "rgba(0, 255, 87, 0.3)",
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    }),
    [filteredData]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true, backgroundColor: tooltipBg },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: textColor } },
        y: { grid: { color: gridColor }, ticks: { color: textColor } },
      },
    }),
    [textColor, gridColor, tooltipBg]
  );

  return (
    <div className="col-span-3 min-w-0 overflow-hidden p-6 bg-white dark:bg-black shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Gold Price History</h2>
      <p className="text-gray-500 dark:text-gray-300 mb-4">Historical gold prices (USD/oz)</p>
      <Tabs defaultValue="7d" className="w-full mb-4" onValueChange={(value) => setTimeframe(value as any)}>
        <TabsList className="grid w-full max-w-[600px] grid-cols-7">
          <TabsTrigger value="7d">7D</TabsTrigger>
          <TabsTrigger value="14d">14D</TabsTrigger>
          <TabsTrigger value="30d">30D</TabsTrigger>
          <TabsTrigger value="60d">60D</TabsTrigger>
          <TabsTrigger value="180d">6M</TabsTrigger>
          <TabsTrigger value="365d">1Y</TabsTrigger>
          <TabsTrigger value="1825d">5Y</TabsTrigger>
        </TabsList>
      </Tabs>
      {loading ? (
        <p className="text-muted-foreground">Loading chart data...</p>
      ) : error ? (
        <div className="text-red-500">
          <p>Error loading data.</p>
          <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : (
        <div className="w-full h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}
