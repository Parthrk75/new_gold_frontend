// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowDown, ArrowUp } from "lucide-react";
// import { useEffect, useState, useRef } from "react";

// interface KaratPrice {
//   karat: string;
//   price: number;
//   change: number;
//   changePercent: number;
// }

// export function KaratPrices() {
//   const [prices, setPrices] = useState<KaratPrice[]>([]);
//   const [displayPrices, setDisplayPrices] = useState<KaratPrice[]>([]);
//   const [lastUpdated, setLastUpdated] = useState<string>("");
//   const lastPricesRef = useRef<KaratPrice[]>([]); // ✅ Store last prices persistently

//   useEffect(() => {
//     async function fetchPrices() {
//       try {
//         console.log("Fetching live gold price...");
//         const response = await fetch("https://api.gold-api.com/price/XAU");
//         if (!response.ok) throw new Error("Failed to fetch live gold prices");

//         const result = await response.json();
//         if (!result || !result.price) throw new Error("Invalid API response");

//         const gold24k = parseFloat(result.price);
//         if (isNaN(gold24k)) throw new Error("Invalid gold price data");

//         // ✅ Convert to different karats
//         const newPrices: KaratPrice[] = [
//           { karat: "24K", price: gold24k, change: 0, changePercent: 0 },
//           { karat: "22K", price: gold24k * 0.9167, change: 0, changePercent: 0 },
//           { karat: "18K", price: gold24k * 0.75, change: 0, changePercent: 0 },
//           { karat: "14K", price: gold24k * 0.5833, change: 0, changePercent: 0 }
//         ];

//         // ✅ Compute price change (keep previous values for 2 minutes)
//         const updatedPrices = newPrices.map((price, index) => {
//           const lastPrice = lastPricesRef.current[index]?.price || price.price;
//           const change = price.price - lastPrice;
//           const changePercent = lastPrice !== 0 ? (change / lastPrice) * 100 : 0;

//           return { ...price, change, changePercent };
//         });

//         setPrices(updatedPrices); // ✅ Store new prices
//         setLastUpdated(new Date().toLocaleTimeString());

//         // ✅ Keep the displayed prices for 2 minutes
//         setDisplayPrices(updatedPrices);
//         setTimeout(() => setDisplayPrices(updatedPrices), 120000); // 2 minutes delay

//         // ✅ Update lastPricesRef without triggering a re-render
//         lastPricesRef.current = newPrices;
//       } catch (error) {
//         console.error("Error fetching live prices:", error);
//       }
//     }

//     fetchPrices();
//     const interval = setInterval(fetchPrices, 120000); // Fetch every 2 minutes
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {displayPrices.map((price) => (
//         <Card key={price.karat} className="overflow-hidden">
//           <CardHeader className="pb-2 bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20">
//             <CardTitle className="text-lg font-medium">{price.karat} Gold</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-4">
//             <div className="flex items-baseline justify-between">
//               <div className="text-2xl font-bold">${price.price.toFixed(2)}</div>
//               <div className={`flex items-center ${price.change >= 0 ? "text-green-500" : "text-red-500"}`}>
//                 {price.change >= 0 ? (
//                   <ArrowUp className="h-4 w-4 mr-1" />
//                 ) : (
//                   <ArrowDown className="h-4 w-4 mr-1" />
//                 )}
//                 <span className="text-sm font-medium">
//                   {Math.abs(price.change).toFixed(2)} ({Math.abs(price.changePercent).toFixed(2)}%)
//                 </span>
//               </div>
//             </div>
//             <p className="text-xs text-muted-foreground mt-2">Per troy ounce • Updated {lastUpdated}</p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }



"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface KaratPrice {
  karat: string;
  price: number;
  change: number;
  changePercent: number;
}

export function KaratPrices() {
  const [prices, setPrices] = useState<KaratPrice[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const lastPricesRef = useRef<KaratPrice[]>([]);

  function formatDateTime(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  useEffect(() => {
    async function fetchPrices() {
      try {
        console.log("Fetching gold prices from API...");
        const response = await fetch("/api/gold-prices"); // Fetch from your API
        if (!response.ok) throw new Error("Failed to fetch gold prices");

        const { prices: newPrices, updatedAt } = await response.json();
        if (!newPrices || !updatedAt) throw new Error("Invalid API response");

        // Calculate price changes
        const updatedPrices = newPrices.map((price: KaratPrice, index: number) => {
          const lastPrice = lastPricesRef.current[index]?.price || price.price;
          const change = price.price - lastPrice;
          const changePercent = lastPrice !== 0 ? (change / lastPrice) * 100 : 0;
          return { ...price, change, changePercent };
        });

        setPrices(updatedPrices);
        setLastUpdated(formatDateTime(updatedAt)); // Convert to New York Time
        lastPricesRef.current = updatedPrices;
      } catch (error) {
        console.error("Error fetching gold prices:", error);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {prices.map((price) => (
        <Card key={price.karat} className="shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105">
          <CardHeader className="pb-2 bg-yellow-50 dark:bg-yellow-900/30">
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-yellow-400">
              {price.karat} Gold
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">${price.price.toFixed(2)}</div>
            <div className={`flex items-center justify-center mt-2 ${price.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {price.change >= 0 ? <ArrowUp className="h-5 w-5 mr-1" /> : <ArrowDown className="h-5 w-5 mr-1" />}
              <span className="text-lg font-medium">
                {Math.abs(price.change).toFixed(2)} ({Math.abs(price.changePercent).toFixed(2)}%)
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Last Updated (New York Time): {lastUpdated}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
