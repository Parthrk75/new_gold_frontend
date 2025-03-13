// "use client";

// import { PriceChart } from "@/components/price-chart";
// import { Footer } from "@/components/footer";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { CalendarIcon, Download } from "lucide-react";
// import { format } from "date-fns";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// export default function HistoricalDataPage() {
//   const [date, setDate] = useState<Date | undefined>(new Date());
  
//   return (
//     <div>
//       <div className="bg-muted py-12">
//         <div className="container">
//           <h1 className="text-4xl font-bold mb-4">Historical Gold Prices</h1>
//           <p className="text-muted-foreground max-w-2xl">
//             Analyze gold price trends over time with our comprehensive historical data. Filter by date range and export data for your own analysis.
//           </p>
//         </div>
//       </div>
      
//       <div className="container py-12">
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Data Filters</CardTitle>
//             <CardDescription>
//               Customize your view of historical gold price data
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="text-sm font-medium mb-2 block">Date Range</label>
//                 <Select defaultValue="30d">
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select range" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="7d">Last 7 days</SelectItem>
//                     <SelectItem value="30d">Last 30 days</SelectItem>
//                     <SelectItem value="90d">Last 90 days</SelectItem>
//                     <SelectItem value="1y">Last year</SelectItem>
//                     <SelectItem value="5y">Last 5 years</SelectItem>
//                     <SelectItem value="custom">Custom range</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
              
//               <div>
//                 <label className="text-sm font-medium mb-2 block">Start Date</label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant={"outline"}
//                       className={cn(
//                         "w-full justify-start text-left font-normal",
//                         !date && "text-muted-foreground"
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {date ? format(date, "PPP") : <span>Pick a date</span>}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0">
//                     <Calendar
//                       mode="single"
//                       selected={date}
//                       onSelect={setDate}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>
              
//               <div>
//                 <label className="text-sm font-medium mb-2 block">Currency</label>
//                 <Select defaultValue="usd">
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select currency" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="usd">USD</SelectItem>
//                     <SelectItem value="eur">EUR</SelectItem>
//                     <SelectItem value="gbp">GBP</SelectItem>
//                     <SelectItem value="jpy">JPY</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
              
//               <div className="flex items-end">
//                 <Button className="w-full">Apply Filters</Button>
//               </div>
//             </div>
            
//             <div className="mt-4 flex justify-end">
//               <Button variant="outline" size="sm" className="flex items-center">
//                 <Download className="mr-2 h-4 w-4" />
//                 Export Data
//               </Button>
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
//             <Card>
//               <CardHeader>
//                 <CardTitle>Historical Price Data</CardTitle>
//                 <CardDescription>
//                   Daily gold prices in USD per troy ounce
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="rounded-md border">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b bg-muted/50">
//                         <th className="py-3 px-4 text-left font-medium">Date</th>
//                         <th className="py-3 px-4 text-left font-medium">Open</th>
//                         <th className="py-3 px-4 text-left font-medium">High</th>
//                         <th className="py-3 px-4 text-left font-medium">Low</th>
//                         <th className="py-3 px-4 text-left font-medium">Close</th>
//                         <th className="py-3 px-4 text-left font-medium">Change</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {Array.from({ length: 10 }).map((_, i) => {
//                         const date = new Date();
//                         date.setDate(date.getDate() - i);
//                         const basePrice = 2350 - i * 5 + Math.random() * 20 - 10;
//                         const open = basePrice - 5 + Math.random() * 10;
//                         const high = open + 5 + Math.random() * 15;
//                         const low = open - 5 - Math.random() * 15;
//                         const close = low + Math.random() * (high - low);
//                         const change = ((close - open) / open) * 100;
                        
//                         return (
//                           <tr key={i} className="border-b">
//                             <td className="py-3 px-4">{format(date, "MMM dd, yyyy")}</td>
//                             <td className="py-3 px-4">${open.toFixed(2)}</td>
//                             <td className="py-3 px-4">${high.toFixed(2)}</td>
//                             <td className="py-3 px-4">${low.toFixed(2)}</td>
//                             <td className="py-3 px-4">${close.toFixed(2)}</td>
//                             <td className={`py-3 px-4 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                               {change >= 0 ? '+' : ''}{change.toFixed(2)}%
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
      
//     </div>
//   );
// }









"use client";

import { PriceChart } from "@/components/price-chart";
import Goldtable from "@/components/gold-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HistoricalDataPage() {
  return (
    <div>
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Historical Gold Prices</h1>
          <p className="text-muted-foreground max-w-2xl">
            Analyze gold price trends over time with our comprehensive historical data.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Filters</CardTitle>
            <CardDescription>Customize your view of historical gold price data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Export Data</button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="mt-4">
            <PriceChart />
          </TabsContent>
          <TabsContent value="table" className="mt-4">
                    <Goldtable/>
            
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
