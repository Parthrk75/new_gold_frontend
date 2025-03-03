"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

interface GoldETF {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  aum: string;
  expense: string;
  chartData: { date: string; price: number }[];
}

export function GoldETFs() {
  const etfs: GoldETF[] = [
    {
      id: "gld",
      name: "SPDR Gold Shares",
      symbol: "GLD",
      price: 187.42,
      change: 1.23,
      changePercent: 0.66,
      aum: "$58.2B",
      expense: "0.40%",
      chartData: generateChartData(185, 0.5)
    },
    {
      id: "iau",
      name: "iShares Gold Trust",
      symbol: "IAU",
      price: 38.75,
      change: 0.28,
      changePercent: 0.73,
      aum: "$27.4B",
      expense: "0.25%",
      chartData: generateChartData(38, 0.3)
    },
    {
      id: "sgol",
      name: "Aberdeen Standard Physical Gold",
      symbol: "SGOL",
      price: 19.32,
      change: 0.14,
      changePercent: 0.73,
      aum: "$2.8B",
      expense: "0.17%",
      chartData: generateChartData(19, 0.2)
    }
  ];
  
  function generateChartData(basePrice: number, volatility: number) {
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Create some random price movement
      const randomFactor = (Math.random() * 2 - 1) * volatility;
      const trendFactor = i / 60; // Slight upward trend
      const price = basePrice - trendFactor + randomFactor;
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: price
      });
    }
    
    return data;
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gold ETFs</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {etfs.map((etf) => (
          <Card key={etf.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{etf.symbol}</CardTitle>
                  <CardDescription>{etf.name}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">${etf.price.toFixed(2)}</div>
                  <div className={etf.change >= 0 ? "text-green-500" : "text-red-500"}>
                    {etf.change >= 0 ? "+" : ""}{etf.change.toFixed(2)} ({etf.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[120px] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={etf.chartData}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id={`color${etf.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      hide={true}
                    />
                    <YAxis 
                      domain={['auto', 'auto']}
                      hide={true}
                    />
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
                      fill={`url(#color${etf.id})`} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div>
                  <span className="text-muted-foreground">AUM:</span> {etf.aum}
                </div>
                <div>
                  <span className="text-muted-foreground">Expense Ratio:</span> {etf.expense}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}