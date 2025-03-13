// "use client";

// import { useState, useEffect } from "react";

// interface HistoricalDataItem {
//   date: string;
//   open: number | null;
//   high: number | null;
//   low: number | null;
//   close: number | null;
//   volume: number | null;
// }

// export default function GoldPriceChart() {
//   const [data, setData] = useState<HistoricalDataItem[]>([]);
//   const [filteredData, setFilteredData] = useState<HistoricalDataItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [days, setDays] = useState<number>(7); // Default filter: Last 7 days

//   // Function to fetch data
//   async function fetchData() {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/historical");
//       if (!response.ok) throw new Error("Failed to fetch data");

//       const result = await response.json();
//       setData(result.historicalData);

//       // Apply default filter (last 7 days)
//       setFilteredData(result.historicalData.slice(-days));
//     } catch (err) {
//       setError("Error fetching data");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Update filtered data when the user selects a different time range
//   useEffect(() => {
//     setFilteredData(data.slice(-days));
//   }, [days, data]);

//   // Fetch data initially and refresh every 2 minutes
//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(fetchData, 120000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
//         Gold Price History
//       </h2>

//       {/* Filter Buttons */}
//       <div className="mb-4 flex gap-3">
//         {[7, 15, 30].map((num) => (
//           <button
//             key={num}
//             className={`px-4 py-2 rounded-md font-semibold transition ${
//               days === num ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
//             }`}
//             onClick={() => setDays(num)}
//           >
//             Last {num} Days
//           </button>
//         ))}
//       </div>

//       {/* Data Table */}
//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
//           <thead className="bg-gray-100 dark:bg-gray-800">
//             <tr>
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Open</th>
//               <th className="border p-2">High</th>
//               <th className="border p-2">Low</th>
//               <th className="border p-2">Close</th>
//               <th className="border p-2">Volume</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr key={index} className="text-center border-t">
//                 <td className="border p-2">{new Date(item.date).toLocaleDateString()}</td>
//                 <td className="border p-2">{item.open ?? "N/A"}</td>
//                 <td className="border p-2">{item.high ?? "N/A"}</td>
//                 <td className="border p-2">{item.low ?? "N/A"}</td>
//                 <td className="border p-2 font-bold">{item.close ?? "N/A"}</td>
//                 <td className="border p-2">{item.volume ?? "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useMemo } from "react";

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

  // Function to fetch data
  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/historical?timestamp=${Date.now()}`); // Prevent caching
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);

      const result = await response.json();

      // Validate API response
      if (!result.historicalData || !Array.isArray(result.historicalData)) {
        throw new Error("Invalid data format received.");
      }

      // Ensure the data is sorted by date (if not already)
      const sortedData = result.historicalData
        .filter((item: HistoricalDataItem) => item.date) // Remove invalid entries
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

  // Filter data based on the selected days
  const filteredData = useMemo(() => {
    if (!data.length) return [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return data.filter((item) => item.date && new Date(item.date) >= cutoffDate);
  }, [days, data]);

  // Fetch data initially and refresh every 2 minutes
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Gold Price History
      </h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex gap-3">
        {[7, 15, 30].map((num) => (
          <button
            key={num}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              days === num ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setDays(num)}
          >
            Last {num} Days
          </button>
        ))}
      </div>

      {/* Data Table */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredData.length === 0 ? (
        <p className="text-gray-500">No data available for the selected range.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Open</th>
              <th className="border p-2">High</th>
              <th className="border p-2">Low</th>
              <th className="border p-2">Close</th>
              <th className="border p-2">Volume</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="text-center border-t">
                <td className="border p-2">
                  {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="border p-2">{item.open?.toFixed(2) ?? "N/A"}</td>
                <td className="border p-2">{item.high?.toFixed(2) ?? "N/A"}</td>
                <td className="border p-2">{item.low?.toFixed(2) ?? "N/A"}</td>
                <td className="border p-2 font-bold">{item.close?.toFixed(2) ?? "N/A"}</td>
                <td className="border p-2">{item.volume ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
