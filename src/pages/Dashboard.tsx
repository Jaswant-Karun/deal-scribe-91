import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  TrendingUp, 
  MessageCircle, 
  AlertTriangle, 
  BarChart3, 
  FileText, 
  Calculator, 
  Trophy, 
  BookOpen,
  Settings,
  LogOut
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sampleData = [
  {
    brand: "Apple",
    model: "iPhone 17",
    margin: "12%",
    sla: "12 hours",
    territory: ["California", "Nevada"],
    expiry: "2026-08-15",
    status: "active"
  },
  {
    brand: "Samsung",
    model: "Galaxy S24",
    margin: "15%",
    sla: "18 hours",
    territory: ["Texas", "Florida"],
    expiry: "2025-05-20",
    status: "warning"
  },
  {
    brand: "Oppo",
    model: "Reno X",
    margin: "8%",
    sla: "24 hours",
    territory: ["Delhi", "Mumbai"],
    expiry: "2025-12-10",
    status: "danger"
  }
];

const dashboardSections = [
  {
    id: "contract-upload",
    title: "Contract Upload",
    description: "Upload and extract PDF contracts",
    icon: Upload,
    route: "/contract-upload",
    color: "bg-primary",
    badge: "Core"
  },
  {
    id: "evolution-map",
    title: "Term Evolution Map",
    description: "Track contract changes over time",
    icon: TrendingUp,
    route: "/evolution-map",
    color: "bg-success",
    badge: "Analytics"
  },
  {
    id: "chatbot",
    title: "AI Q&A Assistant",
    description: "Ask questions about your contracts",
    icon: MessageCircle,
    route: "/chatbot",
    color: "bg-accent",
    badge: "AI"
  },
  {
    id: "risk-heatmap",
    title: "Risk Heatmap",
    description: "Identify contract risks and alerts",
    icon: AlertTriangle,
    route: "/risk-heatmap",
    color: "bg-warning",
    badge: "Risk"
  },
  {
    id: "comparison",
    title: "Cross-Brand Analysis",
    description: "Compare terms across brands",
    icon: BarChart3,
    route: "/cross-brand-comparison",
    color: "bg-primary",
    badge: "Analytics"
  },
  {
    id: "summary",
    title: "Auto-Summary",
    description: "AI-generated contract insights",
    icon: FileText,
    route: "/auto-summary",
    color: "bg-success",
    badge: "AI"
  },
  {
    id: "simulator",
    title: "What-If Simulator",
    description: "Simulate financial scenarios",
    icon: Calculator,
    route: "/simulator",
    color: "bg-accent",
    badge: "Tools"
  },
  {
    id: "leaderboard",
    title: "Performance Leaderboard",
    description: "Track your preparedness score",
    icon: Trophy,
    route: "/leaderboard",
    color: "bg-warning",
    badge: "Gamified"
  },
  {
    id: "playbook",
    title: "Negotiation Playbook",
    description: "AI-powered negotiation tactics",
    icon: BookOpen,
    route: "/negotiation-playbook",
    color: "bg-primary",
    badge: "Strategy"
  }
];

const Dashboard = () => {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState(brand || "apple");

  useEffect(() => {
    if (brand) {
      setSelectedBrand(brand);
      localStorage.setItem("selectedBrand", brand);
    }
  }, [brand]);

  const brandData = sampleData.find(data => data.brand.toLowerCase() === selectedBrand);
  const brandColor = selectedBrand === "apple" ? "bg-black" : 
                    selectedBrand === "samsung" ? "bg-blue-600" :
                    selectedBrand === "oppo" ? "bg-green-600" :
                    selectedBrand === "vivo" ? "bg-purple-600" : "bg-orange-600";

  const handleSectionClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full ${brandColor} flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">
                {selectedBrand.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">DealMind AI</h1>
              <p className="text-sm text-muted-foreground capitalize">
                {selectedBrand} Contract Dashboard
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/brand-selector")}>
              <Settings className="h-4 w-4 mr-2" />
              Switch Brand
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        {brandData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Current Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{brandData.margin}</div>
              </CardContent>
            </Card>
            
            <Card className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">SLA Requirement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{brandData.sla}</div>
              </CardContent>
            </Card>
            
            <Card className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Territory Count</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{brandData.territory.length}</div>
              </CardContent>
            </Card>
            
            <Card className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Contract Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={
                  brandData.status === "active" ? "status-success" :
                  brandData.status === "warning" ? "status-warning" : "status-danger"
                }>
                  {brandData.status.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Dashboard Sections */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Dashboard Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardSections.map((section, index) => (
              <Card
                key={section.id}
                className="card-elevated hover:shadow-xl cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleSectionClick(section.route)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {section.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and contract changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">iPhone 17 contract uploaded successfully</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Samsung contract expiring in 30 days</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New negotiation playbook generated</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;