import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-12 sm:py-16">
      <div className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1610375461369-d613b564c5c3?q=80&w=2070&auto=format&fit=crop)] bg-cover bg-center opacity-10"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Track Gold Prices in Real-Time
          </h1>
          <p className="mt-3 text-lg leading-8 text-muted-foreground">
            Stay informed with live gold prices, historical data, and market insights. 
            Make better investment decisions with our comprehensive gold tracking platform.
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/live-prices">
                View Live Prices
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/historical">
                Historical Data
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
