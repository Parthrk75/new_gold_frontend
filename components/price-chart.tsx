// "use client";

// import { useEffect, useState } from "react";
// import { 
//   Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis 
// } from "recharts";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export function PriceChart() {
//   const [data, setData] = useState<{ date: Date; price: number }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d' | '60d' | '365d' | '1825d'>('7d');

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("/api/historicalData"); // API route for fetching gold prices
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const result = await response.json();

//         // Convert API data to proper Date objects & ensure correct sorting
//         const formattedData = result.historicalData
//   .map((item: { Date: string; Close: number }) => {
//     const [day, month, year] = item.Date.split(" ")[0].split("-"); // Convert DD-MM-YYYY
//     return {
//       date: new Date(`${year}-${month}-${day}`), // Convert to YYYY-MM-DD format
//       price: item.Close,
//     };
//   })
//   .sort((a: { date: Date; price: number }, b: { date: Date; price: number }) => a.date.getTime() - b.date.getTime()); // Ensure data is sorted


//         setData(formattedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   // Fill missing dates for a smooth curve
//   function fillMissingDates(data: { date: Date; price: number }[]) {
//     if (data.length === 0) return data;
    
//     const filledData = [];
//     let prevPrice = data[0].price;
//     let currentDate = new Date(data[0].date);

//     for (let i = 0; i < data.length; i++) {
//       while (currentDate < data[i].date) {
//         filledData.push({ date: new Date(currentDate), price: prevPrice });
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//       filledData.push(data[i]);
//       prevPrice = data[i].price;
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return filledData;
//   }

//   const filteredData = fillMissingDates(
//     timeframe === '7d' ? data.slice(-7) : 
//     timeframe === '14d' ? data.slice(-14) : 
//     timeframe === '30d' ? data.slice(-30) : 
//     timeframe === '60d' ? data.slice(-60) : 
//     timeframe === '365d' ? data.slice(-365) : 
//     timeframe === '1825d' ? data.slice(-1825) : 
//     data
//   );

//   // Format date for X-Axis (e.g., "Jan 2")
//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
//   };

//   return (
//     <Card className="col-span-3 min-w-0 overflow-hidden">
//       <CardHeader>
//         <CardTitle>Gold Price History</CardTitle>
//         <CardDescription>Historical gold prices (USD/oz)</CardDescription>
//         <Tabs defaultValue="7d" className="w-full" onValueChange={(value) => setTimeframe(value as '7d' | '14d' | '30d' | '60d' | '365d' | '1825d')}>
//           <TabsList className="grid w-full max-w-[600px] grid-cols-6">
//             <TabsTrigger value="7d">7D</TabsTrigger>
//             <TabsTrigger value="14d">14D</TabsTrigger>
//             <TabsTrigger value="30d">30D</TabsTrigger>
//             <TabsTrigger value="60d">60D</TabsTrigger>
//             <TabsTrigger value="365d">1Y</TabsTrigger>
//             <TabsTrigger value="1825d">5Y</TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </CardHeader>
//       <CardContent className="h-[350px] flex items-center justify-center">
//         {loading ? (
//           <p className="text-muted-foreground">Loading chart data...</p>
//         ) : error ? (
//           <p className="text-red-500">Error loading data</p>
//         ) : (
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={filteredData} margin={{ top: 10, right: 20, left: 5, bottom: 10 }}>
//               <defs>
//                 <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <XAxis 
//                 dataKey="date"
//                 tickFormatter={(tick) => formatDate(tick)}
//                 stroke="hsl(var(--muted-foreground))"
//                 fontSize={12}
//                 axisLine={true}
//                 tickLine={true}
//                 scale="time"
//                 interval="preserveStartEnd"
//                 minTickGap={10}
//               />
//               <YAxis 
//                 domain={['auto', 'auto']}
//                 stroke="hsl(var(--muted-foreground))"
//                 fontSize={12}
//                 tickFormatter={(value) => `$${value.toFixed(2)}`}
//                 axisLine={true}
//                 tickLine={true}
//               />
//               <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
//               <Tooltip 
//                 contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
//                 formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
//                 labelFormatter={(label) => `Date: ${formatDate(new Date(label))}`}
//               />
//               <Area 
//                 type="monotone" // Ensures smooth curves
//                 dataKey="price" 
//                 stroke="hsl(var(--chart-1))" 
//                 fillOpacity={1} 
//                 fill="url(#colorPrice)" 
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         )}
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse"; // CSV parser
import { 
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from "recharts";
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
        const response = await fetch("/data/historical_gold_spot_prices.csv"); // Fetch CSV directly
        if (!response.ok) throw new Error("Failed to fetch CSV file");

        const csvText = await response.text();
        const parsedData = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        if (!parsedData.data.length) throw new Error("No data found in CSV");

        // Convert CSV data to proper format (Date objects + Prices)
        const formattedData = (parsedData.data as any[])
          .map((item) => {
            const [day, month, year] = item.Date.split(" ")[0].split("-"); // Convert DD-MM-YYYY
            return {
              date: new Date(`${year}-${month}-${day}`), // Convert to YYYY-MM-DD format
              price: parseFloat(item["Close (Spot Price USD)"]) || 0,
            };
          })
          .sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort by date

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

  // Fill missing dates for smooth curve
  function fillMissingDates(data: { date: Date; price: number }[]) {
    if (data.length === 0) return data;
    
    const filledData = [];
    let prevPrice = data[0].price;
    let currentDate = new Date(data[0].date);

    for (let i = 0; i < data.length; i++) {
      while (currentDate < data[i].date) {
        filledData.push({ date: new Date(currentDate), price: prevPrice });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      filledData.push(data[i]);
      prevPrice = data[i].price;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
  }

  const filteredData = fillMissingDates(
    timeframe === '7d' ? data.slice(-7) : 
    timeframe === '14d' ? data.slice(-14) : 
    timeframe === '30d' ? data.slice(-30) : 
    timeframe === '60d' ? data.slice(-60) : 
    timeframe === '365d' ? data.slice(-365) : 
    timeframe === '1825d' ? data.slice(-1825) : 
    data
  );

  // Format date for X-Axis (e.g., "Jan 2")
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

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
      <CardContent className="h-[350px] flex items-center justify-center">
        {loading ? (
          <p className="text-muted-foreground">Loading chart data...</p>
        ) : error ? (
          <p className="text-red-500">Error loading data</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 20, left: 5, bottom: 10 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date"
                tickFormatter={(tick) => formatDate(tick)}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                axisLine={true}
                tickLine={true}
                scale="time"
                interval="preserveStartEnd"
                minTickGap={10}
              />
              <YAxis 
                domain={['auto', 'auto']}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                axisLine={true}
                tickLine={true}
              />
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
                labelFormatter={(label) => `Date: ${formatDate(new Date(label))}`}
              />
              <Area 
                type="monotone" // Ensures smooth curves
                dataKey="price" 
                stroke="hsl(var(--chart-1))" 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
