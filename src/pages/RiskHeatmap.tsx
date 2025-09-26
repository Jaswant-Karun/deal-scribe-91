import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, Clock, TrendingDown, Shield } from "lucide-react";

const riskData = [
  {
    id: "1",
    brand: "Samsung",
    model: "Galaxy S24",
    riskLevel: "high",
    riskType: "Contract Expiring",
    description: "Contract expires in 5 months",
    impact: "Revenue Loss: ₹2,50,00,000",
    daysLeft: 150,
    priority: 1,
  },
  {
    id: "2",
    brand: "Apple",
    model: "iPhone 16",
    riskLevel: "medium",
    riskType: "SLA Stricter",
    description: "SLA requirement increased to 10 hours",
    impact: "Operational Cost: ₹15,00,000",
    daysLeft: 30,
    priority: 2,
  },
  {
    id: "3",
    brand: "Oppo",
    model: "Reno X",
    riskLevel: "medium",
    riskType: "Margin Pressure",
    description: "Margin dropped from 10% to 8%",
    impact: "Profit Loss: ₹80,00,000",
    daysLeft: null,
    priority: 3,
  },
  {
    id: "4",
    brand: "Vivo",
    model: "V-Series",
    riskLevel: "low",
    riskType: "Payment Terms",
    description: "Payment terms extended to Net 60",
    impact: "Cash Flow: ₹50,00,000",
    daysLeft: null,
    priority: 4,
  },
  {
    id: "5",
    brand: "Xiaomi",
    model: "Redmi Pro",
    riskLevel: "low",
    riskType: "Territory Restriction",
    description: "Territory reduced by 2 states",
    impact: "Market Share: 15% reduction",
    daysLeft: null,
    priority: 5,
  },
];

const riskMetrics = {
  totalRisks: riskData.length,
  highRisk: riskData.filter(r => r.riskLevel === "high").length,
  mediumRisk: riskData.filter(r => r.riskLevel === "medium").length,
  lowRisk: riskData.filter(r => r.riskLevel === "low").length,
  totalImpact: "₹4,50,00,000",
};

const RiskHeatmap = () => {
  const navigate = useNavigate();

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "medium":
        return <Clock className="h-5 w-5 text-warning" />;
      case "low":
        return <TrendingDown className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Shield className="h-5 w-5 text-success" />;
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return <Badge className="status-danger">High Risk</Badge>;
      case "medium":
        return <Badge className="status-warning">Medium Risk</Badge>;
      case "low":
        return <Badge variant="secondary">Low Risk</Badge>;
      default:
        return <Badge className="status-success">Safe</Badge>;
    }
  };

  const getBrandColor = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "apple":
        return "bg-black text-white";
      case "samsung":
        return "bg-blue-600 text-white";
      case "oppo":
        return "bg-green-600 text-white";
      case "vivo":
        return "bg-purple-600 text-white";
      case "xiaomi":
        return "bg-orange-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gradient">Risk Heatmap Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor contract risks and identify potential issues before they impact your business
            </p>
          </div>
        </div>

        {/* Risk Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{riskMetrics.totalRisks}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all contracts</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">High Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{riskMetrics.highRisk}</div>
              <p className="text-xs text-muted-foreground mt-1">Immediate attention required</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Medium Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{riskMetrics.mediumRisk}</div>
              <p className="text-xs text-muted-foreground mt-1">Monitor closely</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Potential Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{riskMetrics.totalImpact}</div>
              <p className="text-xs text-muted-foreground mt-1">Total financial exposure</p>
            </CardContent>
          </Card>
        </div>

        {/* Risk Heatmap */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle>Contract Risk Matrix</CardTitle>
            <CardDescription>
              Visual representation of risks across all active contracts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskData.map((risk) => (
                <div
                  key={risk.id}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                    risk.riskLevel === "high"
                      ? "border-destructive/30 bg-destructive/5"
                      : risk.riskLevel === "medium"
                      ? "border-warning/30 bg-warning/5"
                      : "border-border bg-muted/20"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {getRiskIcon(risk.riskLevel)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBrandColor(risk.brand)}`}>
                            {risk.brand}
                          </span>
                          <span className="font-semibold text-lg">{risk.model}</span>
                          {getRiskBadge(risk.riskLevel)}
                        </div>
                        
                        <h3 className="font-semibold text-xl mb-2">{risk.riskType}</h3>
                        <p className="text-muted-foreground mb-3">{risk.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Financial Impact:</p>
                            <p className="text-lg font-bold text-primary">{risk.impact}</p>
                          </div>
                          {risk.daysLeft && (
                            <div>
                              <p className="text-sm font-medium">Time Remaining:</p>
                              <p className="text-lg font-bold text-warning">{risk.daysLeft} days</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Priority</div>
                      <div className="text-2xl font-bold text-primary">#{risk.priority}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Mitigation Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Immediate Actions Required</CardTitle>
              <CardDescription>Critical tasks to address high-priority risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-destructive/5 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-semibold">Renew Samsung Galaxy S24 Contract</p>
                    <p className="text-sm text-muted-foreground">
                      Start renewal negotiations immediately to avoid service disruption
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg">
                  <Clock className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-semibold">Review Apple SLA Requirements</p>
                    <p className="text-sm text-muted-foreground">
                      Assess operational capacity for stricter SLA compliance
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-semibold">Negotiate Oppo Margin Recovery</p>
                    <p className="text-sm text-muted-foreground">
                      Schedule meeting to discuss margin improvement strategies
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Risk Prevention Tips</CardTitle>
              <CardDescription>Best practices to minimize future contract risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-success/5 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">Contract Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up automated alerts 6 months before contract expiration
                  </p>
                </div>
                
                <div className="p-3 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Performance Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor SLA compliance and margin trends monthly
                  </p>
                </div>
                
                <div className="p-3 bg-accent/5 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Relationship Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain regular communication with all brand partners
                  </p>
                </div>
                
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep all contract amendments and communications centralized
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RiskHeatmap;