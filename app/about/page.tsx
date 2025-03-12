import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div>
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">About GoldTrack</h1>
          <p className="text-muted-foreground max-w-2xl">
            Learn more about our mission to provide accurate and timely gold price information.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-6">
              At GoldTrack, we're dedicated to providing investors, traders, and gold enthusiasts with the most accurate, up-to-date information on gold prices and market trends.
            </p>
            <p className="mb-6">
              Founded in 2025, our platform combines real-time data, comprehensive historical analysis, and expert market insights to help you make informed decisions about gold investments.
            </p>
            <p className="mb-6">
              We believe that access to reliable financial information should be available to everyone, which is why we've created a user-friendly platform that makes complex market data easy to understand and act upon.
            </p>
            
            <h2 className="text-3xl font-bold mt-12 mb-6">Our Data</h2>
            <p className="mb-6">
              We source our data from multiple trusted financial institutions and markets around the world. Our prices are updated in real-time, ensuring you always have access to the most current information.
            </p>
            <p className="mb-6">
              Our historical database includes decades of gold price data, allowing you to analyze long-term trends and patterns to inform your investment strategy.
            </p>
            
            <h2 className="text-3xl font-bold mt-12 mb-6">Contact Us</h2>
            <p className="mb-6">
              Have questions or feedback? We'd love to hear from you. Reach out to our team at <a href="mailto:info@goldtrack.example.com" className="text-primary hover:underline">info@goldtrack.example.com</a>.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1610375461369-d613b564c5c3?q=80&w=2070&auto=format&fit=crop" 
                alt="Gold bars" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-bold text-xl mb-4">Why Trust GoldTrack?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Real-time data from trusted sources
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Comprehensive historical database
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Expert market analysis and insights
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  User-friendly interface
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Transparent methodology
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}