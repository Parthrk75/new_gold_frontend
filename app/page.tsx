import { HeroSection } from "@/components/hero-section";
import { NewsSection } from "@/components/news-section";
import { PriceCard } from "@/components/price-card";
import { PriceChart } from "@/components/price-chart";
import { KaratPrices } from "@/components/karat-prices";
import { GoldStocks } from "@/components/gold-stocks";
import { GoldETFs } from "@/components/gold-etfs";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      <div className="container py-12">
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Gold Prices by Karat</h2>
          <KaratPrices />
        </div>
        
        <div className="mt-12 ">

          <PriceChart />
        </div>
        
        <div className="mt-12">
          <GoldStocks />
        </div>
        
        <div className="mt-12">
          <GoldETFs />
        </div>
        
        
      </div>
      
    </div>
  );
}