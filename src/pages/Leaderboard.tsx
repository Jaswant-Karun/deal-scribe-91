import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Star, Target, Award, TrendingUp, Medal } from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    name: "Apple Division",
    score: 98,
    preparedness: 95,
    contractHealth: 100,
    riskManagement: 97,
    badges: ["Contract Master", "Risk Expert", "Top Performer"],
    trend: "up",
    monthlyGrowth: 5,
  },
  {
    rank: 2,
    name: "Samsung Division", 
    score: 85,
    preparedness: 88,
    contractHealth: 85,
    riskManagement: 82,
    badges: ["Negotiation Pro", "Steady Growth"],
    trend: "up",
    monthlyGrowth: 3,
  },
  {
    rank: 3,
    name: "Your Performance",
    score: 78,
    preparedness: 75,
    contractHealth: 80,
    riskManagement: 80,
    badges: ["Rising Star", "Contract Analyst"],
    trend: "up",
    monthlyGrowth: 8,
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: "Oppo Division",
    score: 72,
    preparedness: 70,
    contractHealth: 75,
    riskManagement: 71,
    badges: ["Territory Champion"],
    trend: "stable",
    monthlyGrowth: 1,
  },
  {
    rank: 5,
    name: "Vivo Division",
    score: 68,
    preparedness: 65,
    contractHealth: 70,
    riskManagement: 70,
    badges: ["Improvement Focus"],
    trend: "down",
    monthlyGrowth: -2,
  },
];

const achievements = [
  {
    id: "contract-master",
    title: "Contract Master",
    description: "Successfully managed 10+ contracts",
    icon: Trophy,
    unlocked: true,
    progress: 100,
  },
  {
    id: "risk-expert",
    title: "Risk Management Expert",
    description: "Identified and mitigated 5+ risks",
    icon: Star,
    unlocked: true,
    progress: 100,
  },
  {
    id: "negotiation-ninja",
    title: "Negotiation Ninja",
    description: "Improved margins in 3+ contracts",
    icon: Target,
    unlocked: false,
    progress: 67,
  },
  {
    id: "efficiency-expert",
    title: "Efficiency Expert",
    description: "Achieved 90%+ SLA compliance",
    icon: Award,
    unlocked: false,
    progress: 85,
  },
];

const weeklyChallenge = {
  title: "Contract Analysis Sprint",
  description: "Complete 5 contract analyses this week",
  progress: 3,
  target: 5,
  reward: "50 points + Analyst Badge",
  deadline: "2 days remaining",
};

const Leaderboard = () => {
  const navigate = useNavigate();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-warning";
    return "text-destructive";
  };

  const getTrendIcon = (trend: string, growth: number) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === "down") return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
    return <div className="w-4 h-4 bg-muted rounded-full"></div>;
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
            <h1 className="text-3xl font-bold text-gradient">Performance Leaderboard</h1>
            <p className="text-muted-foreground mt-2">
              Track your contract management performance and compete with other teams
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Contract Management Leaderboard
                </CardTitle>
                <CardDescription>
                  Rankings based on contract performance, risk management, and preparedness scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        entry.isCurrentUser
                          ? "border-primary/50 bg-primary/5 shadow-lg"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          {getRankIcon(entry.rank)}
                          <div>
                            <h3 className={`text-xl font-bold ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                              {entry.name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {getTrendIcon(entry.trend, entry.monthlyGrowth)}
                              <span className={`text-sm ${
                                entry.monthlyGrowth > 0 ? 'text-success' : 
                                entry.monthlyGrowth < 0 ? 'text-destructive' : 'text-muted-foreground'
                              }`}>
                                {entry.monthlyGrowth > 0 ? '+' : ''}{entry.monthlyGrowth}% this month
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${getScoreColor(entry.score)}`}>
                            {entry.score}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Score</div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Preparedness</div>
                          <div className="flex items-center space-x-2">
                            <Progress value={entry.preparedness} className="flex-1" />
                            <span className="text-sm font-medium">{entry.preparedness}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Contract Health</div>
                          <div className="flex items-center space-x-2">
                            <Progress value={entry.contractHealth} className="flex-1" />
                            <span className="text-sm font-medium">{entry.contractHealth}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Risk Management</div>
                          <div className="flex items-center space-x-2">
                            <Progress value={entry.riskManagement} className="flex-1" />
                            <span className="text-sm font-medium">{entry.riskManagement}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {entry.badges.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Weekly Challenge */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{weeklyChallenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{weeklyChallenge.description}</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{weeklyChallenge.progress}/{weeklyChallenge.target}</span>
                    </div>
                    <Progress 
                      value={(weeklyChallenge.progress / weeklyChallenge.target) * 100} 
                      className="w-full"
                    />
                  </div>
                  
                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="text-sm font-medium text-success">Reward</div>
                    <div className="text-sm">{weeklyChallenge.reward}</div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground text-center">
                    ⏰ {weeklyChallenge.deadline}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border ${
                        achievement.unlocked
                          ? "border-success/30 bg-success/5"
                          : "border-border bg-muted/20"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.unlocked
                            ? "bg-success text-white"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <achievement.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${achievement.unlocked ? 'text-success' : ''}`}>
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          {!achievement.unlocked && (
                            <div>
                              <Progress value={achievement.progress} className="w-full h-2" />
                              <div className="text-xs text-muted-foreground mt-1">
                                {achievement.progress}% complete
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Your Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Rank</span>
                    <span className="font-semibold">#3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Points</span>
                    <span className="font-semibold">1,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Badges Earned</span>
                    <span className="font-semibold">2/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Growth</span>
                    <span className="font-semibold text-success">+8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;