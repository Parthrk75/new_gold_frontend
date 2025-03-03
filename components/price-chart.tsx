"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoricalData } from "@/lib/types";
import { getHistoricalData } from "@/lib/data";
import { useEffect, useState } from "react";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

export function PriceChart() {
  const [data, setData] = useState<HistoricalData[]>([]);
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d'>('7d');
  
  useEffect(() => {
    const historicalData = getHistoricalData();
    setData(historicalData);
  }, []);
  
  const filteredData = () => {
    if (timeframe === '7d') {
      return data.slice(-7);
    } else if (timeframe === '14d') {
      return data.slice(-14);
    }
    return data;
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Gold Price History</CardTitle>
        <CardDescription>
          Historical gold price data in USD per troy ounce
        </CardDescription>
        <Tabs 
          defaultValue="7d" 
          className="w-full"
          onValueChange={(value) => setTimeframe(value as '7d' | '14d' | '30d')}
        >
          <TabsList className="grid w-full max-w-[400px] grid-cols-3">
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="14d">14 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="h-[300px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData()}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                // Remove defaultProps usage
                axisLine={true}
                orientation="bottom"
                tickLine={true}
              />
              <YAxis 
                domain={['auto', 'auto']}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
                // Remove defaultProps usage
                axisLine={true}
                orientation="left"
                tickLine={true}
              />
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--card-foreground))'
                }}
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
                labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--chart-1))" 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}