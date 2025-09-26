import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BookOpen, Target, Lightbulb, CheckCircle, RefreshCw } from "lucide-react";

interface PlaybookCard {
  id: string;
  category: string;
  scenario: string;
  strategy: string;
  tactics: string[];
  expectedOutcome: string;
  difficulty: "easy" | "medium" | "hard";
  successRate: number;
}

const playbookData: PlaybookCard[] = [
  {
    id: "1",
    category: "Margin Improvement",
    scenario: "Oppo margin currently at 8%, industry average is 12%",
    strategy: "Volume-based margin scaling with performance incentives",
    tactics: [
      "Present market analysis showing competitor margins",
      "Propose tiered volume discounts in exchange for margin increase",
      "Highlight your consistent performance and payment history",
      "Suggest pilot program for 6 months to prove mutual value"
    ],
    expectedOutcome: "Margin increase to 10-11% with volume commitments",
    difficulty: "medium",
    successRate: 75
  },
  {
    id: "2",
    category: "SLA Negotiation",
    scenario: "Apple demanding 10-hour SLA, current capability is 12 hours",
    strategy: "Operational efficiency showcase with phased improvement plan",
    tactics: [
      "Present current performance metrics and improvement trend",
      "Propose 11-hour SLA with premium pricing for 10-hour service",
      "Offer enhanced reporting and transparency for compliance",
      "Request infrastructure support or margin adjustment for faster SLA"
    ],
    expectedOutcome: "11-hour SLA accepted with 0.5% margin increase",
    difficulty: "hard",
    successRate: 60
  },
  {
    id: "3",
    category: "Payment Terms",
    scenario: "Vivo extending payment terms from Net 30 to Net 60",
    strategy: "Cash flow impact analysis with alternative solutions",
    tactics: [
      "Calculate and present cash flow impact in rupees",
      "Propose early payment discounts (2% for Net 15)",
      "Suggest invoice factoring or supply chain financing options",
      "Request margin increase to offset financing costs"
    ],
    expectedOutcome: "Net 45 compromise with early payment incentives",
    difficulty: "easy",
    successRate: 85
  },
  {
    id: "4",
    category: "Territory Expansion",
    scenario: "Samsung restricting territory coverage to 2 states",
    strategy: "Performance-based territory expansion proposal",
    tactics: [
      "Demonstrate successful performance in current territories",
      "Present market opportunity analysis for new regions",
      "Propose gradual expansion with performance milestones",
      "Offer exclusive partnership in underperformed regions"
    ],
    expectedOutcome: "Expansion to 3-4 states with performance conditions",
    difficulty: "medium",
    successRate: 70
  },
  {
    id: "5",
    category: "Contract Renewal",
    scenario: "Xiaomi contract expiring, competitor offering better terms",
    strategy: "Relationship value and switching cost analysis",
    tactics: [
      "Highlight relationship history and trust built over time",
      "Calculate switching costs and transition risks for Xiaomi",
      "Present performance improvements and future roadmap",
      "Offer loyalty bonuses and long-term partnership benefits"
    ],
    expectedOutcome: "Contract renewal with improved terms",
    difficulty: "medium",
    successRate: 80
  },
  {
    id: "6",
    category: "Risk Mitigation",
    scenario: "Samsung contract with penalty clauses for SLA breaches",
    strategy: "Risk-sharing and mutual accountability framework",
    tactics: [
      "Propose graduated penalty structure based on severity",
      "Request force majeure clauses for external factors",
      "Suggest mutual penalty system for delayed payments",
      "Offer insurance or bond arrangements for major risks"
    ],
    expectedOutcome: "Balanced risk framework with shared accountability",
    difficulty: "hard",
    successRate: 65
  }
];

const NegotiationPlaybook = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const categories = ["all", ...Array.from(new Set(playbookData.map(card => card.category)))];

  const filteredCards = selectedCategory === "all" 
    ? playbookData 
    : playbookData.filter(card => card.category === selectedCategory);

  const toggleCard = (cardId: string) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(cardId)) {
      newFlipped.delete(cardId);
    } else {
      newFlipped.add(cardId);
    }
    setFlippedCards(newFlipped);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "status-success";
      case "medium": return "status-warning";  
      case "hard": return "status-danger";
      default: return "status-warning";
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return "text-success";
    if (rate >= 65) return "text-warning";
    return "text-destructive";
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
            <h1 className="text-3xl font-bold text-gradient">Negotiation Playbook</h1>
            <p className="text-muted-foreground mt-2">
              AI-powered negotiation strategies and tactics for contract management
            </p>
          </div>
        </div>

        {/* Filter and Stats */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary">
              {filteredCards.length} strategies available
            </Badge>
          </div>

          <Button
            variant="outline"
            onClick={() => setFlippedCards(new Set())}
            className="flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset All Cards
          </Button>
        </div>

        {/* Playbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCards.map((card) => (
            <Card
              key={card.id}
              className="card-elevated cursor-pointer hover:shadow-xl transition-all duration-300 group"
              onClick={() => toggleCard(card.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <Badge className={getDifficultyColor(card.difficulty)}>
                    {card.difficulty.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {card.category}
                </CardTitle>
                <CardDescription className="text-sm">
                  Click to reveal strategy and tactics
                </CardDescription>
              </CardHeader>

              <CardContent>
                {!flippedCards.has(card.id) ? (
                  /* Front of Card - Scenario */
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">SCENARIO</h4>
                      <p className="text-sm">{card.scenario}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className={`font-bold ${getSuccessRateColor(card.successRate)}`}>
                        {card.successRate}%
                      </span>
                    </div>

                    <div className="text-center text-xs text-muted-foreground">
                      Click to see strategy →
                    </div>
                  </div>
                ) : (
                  /* Back of Card - Strategy & Tactics */
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        STRATEGY
                      </h4>
                      <p className="text-sm font-medium">{card.strategy}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-1" />
                        TACTICS
                      </h4>
                      <ul className="space-y-1">
                        {card.tactics.map((tactic, index) => (
                          <li key={index} className="flex items-start text-xs">
                            <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-success flex-shrink-0" />
                            {tactic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-success/10 rounded-lg">
                      <h4 className="font-semibold text-sm text-success mb-1">Expected Outcome</h4>
                      <p className="text-xs">{card.expectedOutcome}</p>
                    </div>

                    <div className="text-center text-xs text-muted-foreground">
                      Click to see scenario ←
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips and Best Practices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Negotiation Best Practices</CardTitle>
              <CardDescription>Universal principles for successful contract negotiations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">🎯 Preparation is Key</h4>
                  <p className="text-sm text-muted-foreground">
                    Research market conditions, competitor terms, and have clear objectives before entering negotiations.
                  </p>
                </div>
                
                <div className="p-4 bg-success/5 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">🤝 Build Relationships</h4>
                  <p className="text-sm text-muted-foreground">
                    Focus on long-term partnerships rather than short-term wins. Trust and mutual respect drive better outcomes.
                  </p>
                </div>
                
                <div className="p-4 bg-warning/5 rounded-lg">
                  <h4 className="font-semibold text-warning mb-2">📊 Use Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Support your arguments with concrete data, market analysis, and performance metrics.
                  </p>
                </div>
                
                <div className="p-4 bg-accent/5 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">🎭 Know When to Walk Away</h4>
                  <p className="text-sm text-muted-foreground">
                    Have clear alternatives and be prepared to walk away if terms don't meet minimum requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Common Negotiation Mistakes</CardTitle>
              <CardDescription>Pitfalls to avoid during contract negotiations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <h4 className="font-semibold text-destructive mb-2">❌ Making the First Offer Too Low</h4>
                  <p className="text-sm text-muted-foreground">
                    Starting with unrealistic offers can damage credibility and relationship.
                  </p>
                </div>
                
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <h4 className="font-semibold text-destructive mb-2">❌ Focusing Only on Price</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider total value including terms, support, and strategic benefits.
                  </p>
                </div>
                
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <h4 className="font-semibold text-destructive mb-2">❌ Not Documenting Agreements</h4>
                  <p className="text-sm text-muted-foreground">
                    Always document key points and agreements in writing during discussions.
                  </p>
                </div>
                
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <h4 className="font-semibold text-destructive mb-2">❌ Ignoring Cultural Differences</h4>
                  <p className="text-sm text-muted-foreground">
                    Understand and respect cultural approaches to business and negotiation.
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

export default NegotiationPlaybook;