import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const marginData = [
  { month: "Jan", iPhone16: 10, iPhone17: 11, GalaxyS24: 14, GalaxyS25: 15 },
  { month: "Feb", iPhone16: 10.5, iPhone17: 11.5, GalaxyS24: 14.2, GalaxyS25: 15.1 },
  { month: "Mar", iPhone16: 11, iPhone17: 12, GalaxyS24: 14.5, GalaxyS25: 15.3 },
  { month: "Apr", iPhone16: 11.2, iPhone17: 12.2, GalaxyS24: 14.8, GalaxyS25: 15.5 },
  { month: "May", iPhone16: 11.5, iPhone17: 12.5, GalaxyS24: 15, GalaxyS25: 15.8 },
  { month: "Jun", iPhone16: 11.8, iPhone17: 12.8, GalaxyS24: 15.2, GalaxyS25: 16 },
];

const slaData = [
  { month: "Jan", iPhone16: 14, iPhone17: 12, GalaxyS24: 18, GalaxyS25: 16 },
  { month: "Feb", iPhone16: 13.5, iPhone17: 12, GalaxyS24: 17.5, GalaxyS25: 16 },
  { month: "Mar", iPhone16: 13, iPhone17: 12, GalaxyS24: 17, GalaxyS25: 15.5 },
  { month: "Apr", iPhone16: 12.5, iPhone17: 12, GalaxyS24: 16.5, GalaxyS25: 15 },
  { month: "May", iPhone16: 12, iPhone17: 12, GalaxyS24: 16, GalaxyS25: 14.5 },
  { month: "Jun", iPhone16: 12, iPhone17: 12, GalaxyS24: 15.5, GalaxyS25: 14 },
];

const contractChanges = [
  {
    date: "2024-06-15",
    model: "iPhone 17",
    change: "Margin increased from 11.8% to 12.8%",
    impact: "positive",
    value: "+1.0%"
  },
  {
    date: "2024-06-10",
    model: "Galaxy S25",
    change: "SLA improved from 14.5h to 14h",
    impact: "positive",
    value: "-0.5h"
  },
  {
    date: "2024-05-28",
    model: "iPhone 16",
    change: "Territory expanded to include Arizona",
    impact: "positive",
    value: "+1 State"
  },
  {
    date: "2024-05-15",
    model: "Galaxy S24",
    change: "Payment terms changed to Net 45",
    impact: "negative",
    value: "+15 days"
  },
];

const EvolutionMap = () => {
  const navigate = useNavigate();

  const getTrendIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "positive":
        return <Badge className="status-success">Positive</Badge>;
      case "negative":
        return <Badge className="status-danger">Negative</Badge>;
      default:
        return <Badge variant="secondary">Neutral</Badge>;
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
            <h1 className="text-3xl font-bold text-gradient">Contract Term Evolution Map</h1>
            <p className="text-muted-foreground mt-2">
              Track how contract terms and conditions evolve over time
            </p>
          </div>
        </div>

        {/* Margin Evolution Chart */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle>Margin Evolution Trends</CardTitle>
            <CardDescription>
              Track margin changes across different models over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marginData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Margin (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="iPhone16" 
                    stroke="#000000" 
                    strokeWidth={2}
                    name="iPhone 16"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="iPhone17" 
                    stroke="#666666" 
                    strokeWidth={2}
                    name="iPhone 17"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="GalaxyS24" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    name="Galaxy S24"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="GalaxyS25" 
                    stroke="#1d4ed8" 
                    strokeWidth={2}
                    name="Galaxy S25"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* SLA Evolution Chart */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle>SLA Requirements Evolution</CardTitle>
            <CardDescription>
              Monitor how service level agreement requirements change over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'SLA (hours)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="iPhone16" fill="#000000" name="iPhone 16" />
                  <Bar dataKey="iPhone17" fill="#666666" name="iPhone 17" />
                  <Bar dataKey="GalaxyS24" fill="#2563eb" name="Galaxy S24" />
                  <Bar dataKey="GalaxyS25" fill="#1d4ed8" name="Galaxy S25" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Contract Changes */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Recent Contract Changes</CardTitle>
            <CardDescription>
              Latest modifications to contract terms and their business impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contractChanges.map((change, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getTrendIcon(change.impact)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{change.model}</span>
                        {getImpactBadge(change.impact)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{change.change}</p>
                      <p className="text-xs text-muted-foreground">{change.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-semibold ${
                      change.impact === "positive" ? "text-success" : 
                      change.impact === "negative" ? "text-destructive" : "text-muted-foreground"
                    }`}>
                      {change.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-success mr-2" />
                  iPhone margins improving steadily
                </li>
                <li className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-success mr-2" />
                  Samsung SLAs becoming more competitive
                </li>
                <li className="flex items-center">
                  <Minus className="h-4 w-4 text-muted-foreground mr-2" />
                  Territory expansions increasing
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="text-muted-foreground">
                  • Negotiate iPhone 16 margins to match iPhone 17 levels
                </li>
                <li className="text-muted-foreground">
                  • Consider Samsung's improving SLA competitiveness
                </li>
                <li className="text-muted-foreground">
                  • Review payment terms across all contracts
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="text-muted-foreground">
                  • iPhone 18 contract negotiations (Q3 2024)
                </li>
                <li className="text-muted-foreground">
                  • Galaxy S26 terms review (Q4 2024)
                </li>
                <li className="text-muted-foreground">
                  • Annual contract renewals (Q1 2025)
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EvolutionMap;