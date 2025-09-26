import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const comparisonData = [
  {
    brand: "Apple",
    margin: 12,
    sla: 12,
    territory: 3,
    paymentTerms: 30,
    score: 85,
  },
  {
    brand: "Samsung",
    margin: 15,
    sla: 18,
    territory: 2,
    paymentTerms: 45,
    score: 78,
  },
  {
    brand: "Oppo",
    margin: 8,
    sla: 24,
    territory: 5,
    paymentTerms: 30,
    score: 65,
  },
  {
    brand: "Vivo",
    margin: 10,
    sla: 20,
    territory: 4,
    paymentTerms: 60,
    score: 70,
  },
  {
    brand: "Xiaomi",
    margin: 9,
    sla: 16,
    territory: 6,
    paymentTerms: 30,
    score: 72,
  },
];

const radarData = [
  {
    metric: "Margin",
    Apple: 80,
    Samsung: 100,
    Oppo: 53,
    Vivo: 67,
    Xiaomi: 60,
  },
  {
    metric: "SLA Flexibility",
    Apple: 50,
    Samsung: 75,
    Oppo: 100,
    Vivo: 83,
    Xiaomi: 67,
  },
  {
    metric: "Territory Coverage",
    Apple: 50,
    Samsung: 33,
    Oppo: 83,
    Vivo: 67,
    Xiaomi: 100,
  },
  {
    metric: "Payment Terms",
    Apple: 75,
    Samsung: 50,
    Oppo: 75,
    Vivo: 25,
    Xiaomi: 75,
  },
  {
    metric: "Overall Score",
    Apple: 85,
    Samsung: 78,
    Oppo: 65,
    Vivo: 70,
    Xiaomi: 72,
  },
];

const CrossBrandComparison = () => {
  const navigate = useNavigate();

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case "Apple": return "#000000";
      case "Samsung": return "#2563eb";
      case "Oppo": return "#16a34a";
      case "Vivo": return "#9333ea";
      case "Xiaomi": return "#ea580c";
      default: return "#6b7280";
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="status-success">Excellent</Badge>;
    if (score >= 70) return <Badge className="status-warning">Good</Badge>;
    return <Badge className="status-danger">Needs Improvement</Badge>;
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
            <h1 className="text-3xl font-bold text-gradient">Cross-Brand Analysis</h1>
            <p className="text-muted-foreground mt-2">
              Compare contract terms, performance metrics, and opportunities across all brands
            </p>
          </div>
        </div>

        {/* Margin Comparison Chart */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Margin Comparison
            </CardTitle>
            <CardDescription>
              Compare profit margins across all brand partnerships
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="brand" />
                  <YAxis label={{ value: 'Margin (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar 
                    dataKey="margin" 
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Radar Chart */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle>Multi-Dimensional Performance Analysis</CardTitle>
            <CardDescription>
              Comprehensive view of all contract parameters across brands
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Apple" dataKey="Apple" stroke="#000000" fill="#000000" fillOpacity={0.1} />
                  <Radar name="Samsung" dataKey="Samsung" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} />
                  <Radar name="Oppo" dataKey="Oppo" stroke="#16a34a" fill="#16a34a" fillOpacity={0.1} />
                  <Radar name="Vivo" dataKey="Vivo" stroke="#9333ea" fill="#9333ea" fillOpacity={0.1} />
                  <Radar name="Xiaomi" dataKey="Xiaomi" stroke="#ea580c" fill="#ea580c" fillOpacity={0.1} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Comparison Table */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle>Detailed Contract Comparison</CardTitle>
            <CardDescription>
              Side-by-side comparison of all key contract parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Brand</th>
                    <th className="text-center p-4 font-semibold">Margin</th>
                    <th className="text-center p-4 font-semibold">SLA (hours)</th>
                    <th className="text-center p-4 font-semibold">Territories</th>
                    <th className="text-center p-4 font-semibold">Payment Terms</th>
                    <th className="text-center p-4 font-semibold">Overall Score</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((brand, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: getBrandColor(brand.brand) }}
                          ></div>
                          <span className="font-semibold">{brand.brand}</span>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="font-semibold text-success">{brand.margin}%</span>
                          {brand.margin >= 12 ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      </td>
                      <td className="text-center p-4">
                        <span className={`font-semibold ${brand.sla <= 12 ? 'text-destructive' : 'text-success'}`}>
                          {brand.sla}h
                        </span>
                      </td>
                      <td className="text-center p-4">
                        <span className="font-semibold text-primary">{brand.territory}</span>
                      </td>
                      <td className="text-center p-4">
                        <span className={`font-semibold ${brand.paymentTerms <= 30 ? 'text-success' : 'text-warning'}`}>
                          Net {brand.paymentTerms}
                        </span>
                      </td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="font-semibold">{brand.score}</span>
                          {getScoreBadge(brand.score)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Data-driven observations from the comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-success/5 rounded-lg border-l-4 border-success">
                  <h4 className="font-semibold text-success mb-2">Best Performing</h4>
                  <p className="text-sm">
                    <strong>Samsung</strong> offers the highest margin (15%) but requires longer SLA response times.
                  </p>
                </div>
                
                <div className="p-4 bg-warning/5 rounded-lg border-l-4 border-warning">
                  <h4 className="font-semibold text-warning mb-2">Opportunity</h4>
                  <p className="text-sm">
                    <strong>Oppo</strong> has the largest territory coverage but lowest margins - potential for renegotiation.
                  </p>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold text-primary mb-2">Balanced Option</h4>
                  <p className="text-sm">
                    <strong>Apple</strong> provides consistent terms with good margin and manageable SLA requirements.
                  </p>
                </div>
                
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <h4 className="font-semibold text-destructive mb-2">Areas of Concern</h4>
                  <p className="text-sm">
                    <strong>Vivo</strong> has the longest payment terms (Net 60) impacting cash flow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
              <CardDescription>Action items based on cross-brand analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Margin Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Focus on improving Oppo and Xiaomi margins to match Samsung levels.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">2. Payment Terms Negotiation</h4>
                  <p className="text-sm text-muted-foreground">
                    Work with Vivo to reduce payment terms from Net 60 to Net 45.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">3. Territory Expansion</h4>
                  <p className="text-sm text-muted-foreground">
                    Leverage Xiaomi's territory model to expand Apple and Samsung coverage.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">4. SLA Standardization</h4>
                  <p className="text-sm text-muted-foreground">
                    Aim for 15-hour SLA standard across all brands for operational efficiency.
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

export default CrossBrandComparison;