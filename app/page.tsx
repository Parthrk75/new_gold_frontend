import { HeroSection } from "@/components/hero-section";
// import { MarketStats } from "@/components/market-stats";
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
        {/* <h2 className="text-3xl font-bold mb-8">Gold Market Overview</h2>
        <MarketStats /> */}
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Gold Prices by Karat</h2>
          <KaratPrices />
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <PriceCard />
          <PriceChart />
        </div>
        
        <div className="mt-12">
          <GoldStocks />
        </div>
        
        <div className="mt-12">
          <GoldETFs />
        </div>
        
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Gold Price Comparison</CardTitle>
              <CardDescription>
                Compare gold prices across different markets and forms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Physical Gold</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Gold Bullion (1oz)</span>
                      <span className="font-medium">$2,345.67</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gold Coin (American Eagle)</span>
                      <span className="font-medium">$2,425.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gold Bar (1kg)</span>
                      <span className="font-medium">$75,420.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gold Jewelry (24K)</span>
                      <span className="font-medium">$2,580.20</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Paper Gold</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Gold Futures</span>
                      <span className="font-medium">$2,352.80</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gold ETFs (avg)</span>
                      <span className="font-medium">$2,348.25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gold Mining Index</span>
                      <span className="font-medium">$142.75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gold Certificates</span>
                      <span className="font-medium">$2,340.10</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Regional Prices</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>USA (COMEX)</span>
                      <span className="font-medium">$2,345.67</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UK (LBMA)</span>
                      <span className="font-medium">$2,347.20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>China (SGE)</span>
                      <span className="font-medium">$2,352.40</span>
                    </div>
                    <div className="flex justify-between">
                      <span>India (MCX)</span>
                      <span className="font-medium">$2,358.75</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <NewsSection />
      <Footer />
    </div>
  );
}