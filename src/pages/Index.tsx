import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 animate-scale-in">
            <Brain className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
            DealMind AI
          </h1>
          
          <p className="text-2xl text-white/80 mb-8 max-w-3xl mx-auto animate-slide-up">
            Smart Contract Assistant for Mobile Device Partnerships
          </p>
          
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Revolutionize your contract management with AI-powered analysis, 
            risk detection, and negotiation strategies for Apple, Samsung, Oppo, Vivo, and Xiaomi partnerships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/login")}
              className="btn-hero text-lg px-8 py-4"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              variant="outline"
              className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Create Account
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="glass-effect border-white/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Analysis</h3>
              <p className="text-white/70 text-sm">
                Automatically extract and analyze contract terms with advanced AI
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Risk Detection</h3>
              <p className="text-white/70 text-sm">
                Identify potential risks and receive proactive alerts
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-warning rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Performance Tracking</h3>
              <p className="text-white/70 text-sm">
                Monitor margins, SLAs, and contract evolution over time
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Negotiations</h3>
              <p className="text-white/70 text-sm">
                AI-powered negotiation strategies and playbooks
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Contract Management?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust DealMind AI for smarter contract decisions
          </p>
          <Button
            onClick={() => navigate("/signup")}
            className="btn-hero text-lg px-12 py-4"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
