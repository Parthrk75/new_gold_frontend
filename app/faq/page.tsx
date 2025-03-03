import { Footer } from "@/components/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FAQPage() {
  return (
    <div>
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl">
            Find answers to common questions about gold prices, investing in gold, and using our platform.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Gold Price FAQs</CardTitle>
                <CardDescription>
                  Common questions about gold prices and market trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What factors influence gold prices?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">Gold prices are influenced by multiple factors including:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Monetary policy and interest rates</li>
                        <li>Inflation and currency fluctuations</li>
                        <li>Geopolitical tensions and uncertainty</li>
                        <li>Supply and demand dynamics</li>
                        <li>Central bank reserves and purchasing</li>
                        <li>Market sentiment and investor behavior</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Why do gold prices fluctuate?</AccordionTrigger>
                    <AccordionContent>
                      Gold prices fluctuate due to changes in supply and demand, economic indicators, geopolitical events, and market sentiment. As a globally traded asset, gold responds to factors across different markets and economies. During times of economic uncertainty, gold often sees increased demand as a safe-haven asset, which can drive prices higher.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What is the difference between spot price and futures price?</AccordionTrigger>
                    <AccordionContent>
                      The spot price refers to the current market price at which gold can be bought or sold for immediate delivery. The futures price is the price agreed upon today for delivery at a specified future date. Futures prices reflect market expectations of what the spot price will be at the contract's expiration date, plus carrying costs like storage and insurance.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How often are gold prices updated?</AccordionTrigger>
                    <AccordionContent>
                      On our platform, gold prices are updated in real-time during market hours. The global gold market operates 24 hours a day, five days a week, with major trading centers in London, New York, Shanghai, Tokyo, and Zurich. Our data is sourced from multiple exchanges to provide the most current pricing information available.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>What is the gold-silver ratio?</AccordionTrigger>
                    <AccordionContent>
                      The gold-silver ratio represents how many ounces of silver it takes to purchase one ounce of gold. It's calculated by dividing the current gold price by the current silver price. Investors use this ratio to determine the relative value of the two metals and potential trading opportunities when the ratio reaches historical extremes.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Gold Investment FAQs</CardTitle>
                <CardDescription>
                  Questions about investing in gold and different investment options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What are the different ways to invest in gold?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">There are several ways to invest in gold:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Physical gold (bullion, coins, jewelry)</li>
                        <li>Gold ETFs (Exchange-Traded Funds)</li>
                        <li>Gold mining stocks</li>
                        <li>Gold futures and options</li>
                        <li>Gold certificates</li>
                        <li>Gold mutual funds</li>
                      </ul>
                      <p className="mt-2">Each method has different characteristics in terms of liquidity, storage requirements, costs, and exposure to gold price movements.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is the difference between 24K, 22K, and 18K gold?</AccordionTrigger>
                    <AccordionContent>
                      The karat (K) measurement indicates the purity of gold:
                      <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>24K gold is 99.9% pure gold</li>
                        <li>22K gold contains 91.7% gold and 8.3% other metals</li>
                        <li>18K gold contains 75% gold and 25% other metals</li>
                        <li>14K gold contains 58.3% gold and 41.7% other metals</li>
                      </ul>
                      <p className="mt-2">Higher karat gold is more pure but also softer, while lower karat gold is more durable due to the added alloys.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Are gold ETFs a good investment?</AccordionTrigger>
                    <AccordionContent>
                      Gold ETFs offer a convenient way to gain exposure to gold prices without the need to store physical gold. They're generally liquid, have low expense ratios, and track gold prices closely. However, they don't provide the same security as owning physical gold during extreme market disruptions. Whether they're a good investment depends on your investment goals, risk tolerance, and overall portfolio strategy.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do gold mining stocks differ from physical gold?</AccordionTrigger>
                    <AccordionContent>
                      Gold mining stocks represent ownership in companies that mine for gold, rather than ownership of gold itself. Their performance is influenced by gold prices but also by company-specific factors like production costs, management quality, exploration success, and operational efficiency. Mining stocks often provide leverage to gold prices (they may rise or fall more dramatically than gold itself) and can pay dividends, unlike physical gold.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Using Our Platform</CardTitle>
                <CardDescription>
                  Help with using GoldTrack features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I export historical data?</AccordionTrigger>
                    <AccordionContent>
                      To export historical gold price data, navigate to the Historical Data page, set your desired date range and filters, then click the "Export Data" button. The data will be downloaded as a CSV file that can be opened in spreadsheet applications like Excel or Google Sheets.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I set price alerts?</AccordionTrigger>
                    <AccordionContent>
                      Yes, registered users can set price alerts. Navigate to your account settings and select "Price Alerts." You can set alerts for specific price thresholds, percentage changes, or technical indicators. Alerts can be delivered via email or push notifications if you're using our mobile app.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How accurate is your pricing data?</AccordionTrigger>
                    <AccordionContent>
                      Our gold price data is sourced from major global exchanges and financial data providers. We update prices in real-time during market hours and ensure our historical data undergoes rigorous validation. While we strive for the highest accuracy, slight variations may occur between different data sources due to timing differences and market liquidity.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-muted rounded-lg p-6">
              <h3 className="font-bold text-xl mb-4">Still Have Questions?</h3>
              <p className="mb-4">
                If you couldn't find the answer you were looking for, please contact our support team.
              </p>
              <p className="text-sm">
                Email: <a href="mailto:support@goldtrack.example.com" className="text-primary hover:underline">support@goldtrack.example.com</a>
              </p>
              <p className="text-sm mt-2">
                Hours: Monday-Friday, 9am-5pm EST
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}