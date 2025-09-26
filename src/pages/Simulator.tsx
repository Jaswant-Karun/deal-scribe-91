import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Calculator, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface SimulationParams {
  brand: string;
  currentMargin: number;
  marginDrop: number;
  unitsSold: number;
  avgSellingPrice: number;
  operationalCost: number;
}

const brandDefaults = {
  apple: { margin: 12, units: 50000, price: 80000, cost: 2000000 },
  samsung: { margin: 15, units: 45000, price: 75000, cost: 1800000 },
  oppo: { margin: 8, units: 60000, price: 25000, cost: 1200000 },
  vivo: { margin: 10, units: 55000, price: 30000, cost: 1500000 },
  xiaomi: { margin: 9, units: 70000, price: 20000, cost: 1000000 },
};

const Simulator = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<SimulationParams>({
    brand: "apple",
    currentMargin: 12,
    marginDrop: 2,
    unitsSold: 50000,
    avgSellingPrice: 80000,
    operationalCost: 2000000,
  });

  const [results, setResults] = useState<any>(null);

  const handleBrandChange = (brand: string) => {
    const defaults = brandDefaults[brand as keyof typeof brandDefaults];
    setParams({
      ...params,
      brand,
      currentMargin: defaults.margin,
      unitsSold: defaults.units,
      avgSellingPrice: defaults.price,
      operationalCost: defaults.cost,
    });
  };

  const calculateImpact = () => {
    const currentRevenue = params.unitsSold * params.avgSellingPrice;
    const currentProfit = (currentRevenue * params.currentMargin) / 100;
    const newMargin = params.currentMargin - params.marginDrop;
    const newProfit = (currentRevenue * newMargin) / 100;
    const profitLoss = currentProfit - newProfit;
    const percentageLoss = ((profitLoss / currentProfit) * 100);
    
    const breakEvenUnits = Math.ceil(currentProfit / ((params.avgSellingPrice * newMargin) / 100));
    const additionalUnitsNeeded = Math.max(0, breakEvenUnits - params.unitsSold);
    
    const cashFlowImpact = profitLoss;
    const operationalEfficiency = Math.max(0, 100 - (params.marginDrop * 10));
    
    const riskLevel = percentageLoss >= 25 ? "high" : percentageLoss >= 15 ? "medium" : "low";
    
    const resultData = {
      currentRevenue,
      currentProfit,
      newProfit,
      profitLoss,
      percentageLoss,
      newMargin,
      breakEvenUnits,
      additionalUnitsNeeded,
      cashFlowImpact,
      operationalEfficiency,
      riskLevel,
    };
    
    setResults(resultData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData = results ? [
    { name: 'Current Profit', value: results.currentProfit, fill: '#16a34a' },
    { name: 'New Profit', value: results.newProfit, fill: '#2563eb' },
    { name: 'Profit Loss', value: results.profitLoss, fill: '#dc2626' },
  ] : [];

  const impactData = results ? [
    { metric: 'Revenue Impact', current: results.currentRevenue / 1000000, projected: results.currentRevenue / 1000000 },
    { metric: 'Profit Impact', current: results.currentProfit / 1000000, projected: results.newProfit / 1000000 },
    { metric: 'Margin %', current: params.currentMargin, projected: results.newMargin },
  ] : [];

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
            <h1 className="text-3xl font-bold text-gradient">What-If Simulator</h1>
            <p className="text-muted-foreground mt-2">
              Simulate different scenarios and understand their financial impact on your business
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simulation Parameters */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Simulation Parameters
              </CardTitle>
              <CardDescription>
                Adjust the parameters to simulate different business scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Brand Selection */}
              <div className="space-y-2">
                <Label>Brand</Label>
                <Select value={params.brand} onValueChange={handleBrandChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="samsung">Samsung</SelectItem>
                    <SelectItem value="oppo">Oppo</SelectItem>
                    <SelectItem value="vivo">Vivo</SelectItem>
                    <SelectItem value="xiaomi">Xiaomi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Current Margin */}
              <div className="space-y-2">
                <Label>Current Margin (%)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[params.currentMargin]}
                    onValueChange={(value) => setParams({...params, currentMargin: value[0]})}
                    max={20}
                    min={5}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="w-12 text-sm font-medium">{params.currentMargin}%</span>
                </div>
              </div>

              {/* Margin Drop */}
              <div className="space-y-2">
                <Label>Margin Drop (%)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[params.marginDrop]}
                    onValueChange={(value) => setParams({...params, marginDrop: value[0]})}
                    max={10}
                    min={0}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="w-12 text-sm font-medium">-{params.marginDrop}%</span>
                </div>
              </div>

              {/* Units Sold */}
              <div className="space-y-2">
                <Label>Units Sold (per month)</Label>
                <Input
                  type="number"
                  value={params.unitsSold}
                  onChange={(e) => setParams({...params, unitsSold: parseInt(e.target.value) || 0})}
                />
              </div>

              {/* Average Selling Price */}
              <div className="space-y-2">
                <Label>Average Selling Price (₹)</Label>
                <Input
                  type="number"
                  value={params.avgSellingPrice}
                  onChange={(e) => setParams({...params, avgSellingPrice: parseInt(e.target.value) || 0})}
                />
              </div>

              {/* Operational Cost */}
              <div className="space-y-2">
                <Label>Monthly Operational Cost (₹)</Label>
                <Input
                  type="number"
                  value={params.operationalCost}
                  onChange={(e) => setParams({...params, operationalCost: parseInt(e.target.value) || 0})}
                />
              </div>

              <Button onClick={calculateImpact} className="w-full btn-hero">
                Run Simulation
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Simulation Results</CardTitle>
              <CardDescription>
                Financial impact analysis of the simulated scenario
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!results ? (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Adjust the parameters and click "Run Simulation" to see results
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Impact Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-destructive" />
                        <span className="text-sm font-medium">Profit Loss</span>
                      </div>
                      <div className="text-2xl font-bold text-destructive">
                        {formatCurrency(results.profitLoss)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        -{results.percentageLoss.toFixed(1)}% decrease
                      </div>
                    </div>

                    <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <span className="text-sm font-medium">Risk Level</span>
                      </div>
                      <div className={`text-2xl font-bold capitalize ${
                        results.riskLevel === 'high' ? 'text-destructive' : 
                        results.riskLevel === 'medium' ? 'text-warning' : 'text-success'
                      }`}>
                        {results.riskLevel}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Business impact level
                      </div>
                    </div>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Current Profit</span>
                      <span className="text-success font-bold">{formatCurrency(results.currentProfit)}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">New Profit</span>
                      <span className="text-primary font-bold">{formatCurrency(results.newProfit)}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">New Margin</span>
                      <span className="font-bold">{results.newMargin.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Break-even Units</span>
                      <span className="font-bold">{results.breakEvenUnits.toLocaleString()}</span>
                    </div>
                    {results.additionalUnitsNeeded > 0 && (
                      <div className="flex justify-between p-3 bg-warning/10 rounded-lg">
                        <span className="font-medium">Additional Units Needed</span>
                        <span className="font-bold text-warning">+{results.additionalUnitsNeeded.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Profit Breakdown Chart */}
                  <div className="h-64">
                    <h4 className="font-semibold mb-4 text-center">Profit Impact Visualization</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Impact Comparison Chart */}
        {results && (
          <Card className="card-elevated mt-8">
            <CardHeader>
              <CardTitle>Before vs After Comparison</CardTitle>
              <CardDescription>
                Visual comparison of key metrics before and after the simulated changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#16a34a" name="Current" />
                    <Bar dataKey="projected" fill="#dc2626" name="After Change" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        {results && (
          <Card className="card-elevated mt-8">
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
              <CardDescription>
                Action items based on simulation results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Risk Mitigation</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Negotiate volume incentives to maintain margins</li>
                    <li>• Explore operational cost reductions</li>
                    <li>• Consider premium product mix adjustments</li>
                    <li>• Implement efficiency improvements</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Growth Opportunities</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Increase sales volume to offset margin loss</li>
                    <li>• Explore new territory expansion</li>
                    <li>• Develop value-added services</li>
                    <li>• Consider strategic partnerships</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Simulator;