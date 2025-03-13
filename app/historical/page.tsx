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




