import LivePriceClient from "./livePriceClient";
import { PriceCard } from "@/components/price-card";
import { PriceChart } from "@/components/price-chart";

export default function LivePricePage() {
  return (
    <div>
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Live Gold Prices</h1>
          <p className="text-muted-foreground max-w-2xl">
            Track real-time gold prices and market statistics. Our data is updated every few seconds to give you the most current information.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3">
            <PriceCard />
          </div>

          {/* Client-side logic */}
          <LivePriceClient />
        </div>

        <div className="mt-8">
          <PriceChart />
        </div>
      </div>

    </div>
  );
}
