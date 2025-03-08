// "use client";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowDown, ArrowUp } from "lucide-react";

// interface GoldStock {
//   symbol: string;
//   name: string;
//   price: number;
//   change: number;
//   changePercent: number;
//   volume: string;
// }

// export function GoldStocks() {
//   const stocks: GoldStock[] = [
//     {
//       symbol: "NEM",
//       name: "Newmont Corporation",
//       price: 57.82,
//       change: 1.24,
//       changePercent: 2.19,
//       volume: "6.2M"
//     },
//     {
//       symbol: "GOLD",
//       name: "Barrick Gold Corporation",
//       price: 18.45,
//       change: 0.32,
//       changePercent: 1.77,
//       volume: "12.8M"
//     },
//     {
//       symbol: "AEM",
//       name: "Agnico Eagle Mines",
//       price: 64.73,
//       change: -0.87,
//       changePercent: -1.33,
//       volume: "1.5M"
//     },
//     {
//       symbol: "FNV",
//       name: "Franco-Nevada Corporation",
//       price: 142.56,
//       change: 2.18,
//       changePercent: 1.55,
//       volume: "0.9M"
//     }
//   ];
  
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Gold Mining Stocks</CardTitle>
//         <CardDescription>
//           Major gold mining and production companies
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="rounded-md border">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b bg-muted/50">
//                 <th className="py-3 px-4 text-left font-medium">Symbol</th>
//                 <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Company</th>
//                 <th className="py-3 px-4 text-right font-medium">Price</th>
//                 <th className="py-3 px-4 text-right font-medium">Change</th>
//                 <th className="py-3 px-4 text-right font-medium hidden md:table-cell">Volume</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stocks.map((stock) => (
//                 <tr key={stock.symbol} className="border-b">
//                   <td className="py-3 px-4 font-medium">{stock.symbol}</td>
//                   <td className="py-3 px-4 hidden md:table-cell">{stock.name}</td>
//                   <td className="py-3 px-4 text-right">${stock.price.toFixed(2)}</td>
//                   <td className={`py-3 px-4 text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                     <div className="flex items-center justify-end">
//                       {stock.change >= 0 ? 
//                         <ArrowUp className="h-4 w-4 mr-1" /> : 
//                         <ArrowDown className="h-4 w-4 mr-1" />
//                       }
//                       <span>
//                         {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4 text-right hidden md:table-cell">{stock.volume}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <p className="text-xs text-muted-foreground mt-2 text-right">
//           *Market data delayed by at least 15 minutes
//         </p>
//       </CardContent>
//     </Card>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface GoldStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export function GoldStocks() {
  const [stocks, setStocks] = useState<GoldStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const response = await fetch("/api/gold-mining-stocks");
        if (!response.ok) throw new Error("Failed to fetch stock data");
        
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStocks();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gold Mining Stocks</CardTitle>
        <CardDescription>Major gold mining and production companies</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading stock data...</p>
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
                {stocks.map((stock) => (
                  <tr key={stock.symbol} className="border-b">
                    <td className="py-3 px-4 font-medium">{stock.symbol}</td>
                    <td className="py-3 px-4 hidden md:table-cell">{stock.name}</td>
                    <td className="py-3 px-4 text-right">${stock.price.toFixed(2)}</td>
                    <td className={`py-3 px-4 text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      <div className="flex items-center justify-end">
                        {stock.change >= 0 ? 
                          <ArrowUp className="h-4 w-4 mr-1" /> : 
                          <ArrowDown className="h-4 w-4 mr-1" />
                        }
                        <span>
                          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right hidden md:table-cell">{stock.volume}</td>
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
