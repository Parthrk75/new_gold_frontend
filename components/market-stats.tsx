import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign, TrendingDown, TrendingUp } from "lucide-react";

export function MarketStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Gold/USD Ratio" 
        value="1:2350" 
        description="Current exchange rate"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard 
        title="24h Change" 
        value="+1.2%" 
        description="Price change in last 24 hours"
        trend="up"
        icon={<TrendingUp className="h-4 w-4 text-green-500" />}
      />
      <StatCard 
        title="7d Change" 
        value="-0.5%" 
        description="Price change in last 7 days"
        trend="down"
        icon={<TrendingDown className="h-4 w-4 text-red-500" />}
      />
      <StatCard 
        title="Market Volume" 
        value="$8.2B" 
        description="24h trading volume"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend?: "up" | "down";
  icon?: React.ReactNode;
}

function StatCard({ title, value, description, trend, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          {trend && (
            <span className="ml-2">
              {trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 inline text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 inline text-red-500" />
              )}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}