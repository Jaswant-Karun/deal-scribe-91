import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Bot, User, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const predefinedQuestions = [
  "What's the current margin for iPhone 17?",
  "Compare SLA requirements between Apple and Samsung",
  "Which contracts are expiring soon?",
  "What territories are covered in the Oppo contract?",
  "Show me payment terms for all brands",
  "What's my negotiation position with Xiaomi?",
];

const sampleResponses = {
  "margin": "The current margin for iPhone 17 is 12%. This represents a 1% improvement from the iPhone 16 margin of 11%. The margin has been steadily increasing over the past 6 months.",
  "sla": "SLA comparison: Apple iPhone 17 requires 12-hour response time, while Samsung Galaxy S24 requires 18 hours. Apple has stricter SLA requirements but offers higher margins.",
  "expiring": "You have 2 contracts expiring soon: Samsung Galaxy S24 (expires May 20, 2025 - 5 months remaining) and Oppo Reno X (expires December 10, 2025 - 11 months remaining).",
  "territory": "The Oppo contract covers the following territories: Delhi, Mumbai, Bangalore, Chennai, and Hyderabad. This represents the top 5 metropolitan markets in India.",
  "payment": "Payment terms vary by brand: Apple (Net 30 days), Samsung (Net 45 days), Oppo (Net 30 days), Vivo (Net 60 days), Xiaomi (Net 30 days).",
  "negotiation": "Your negotiation position with Xiaomi is strong. You have consistent order volumes, good payment history, and their current margin of 9% has room for improvement. Consider negotiating for 10-11% margin.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your DealMind AI assistant. I can help you analyze contracts, compare terms, and answer questions about your deals. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("margin") || message.includes("iphone 17")) {
      return sampleResponses.margin;
    } else if (message.includes("sla") || message.includes("compare")) {
      return sampleResponses.sla;
    } else if (message.includes("expiring") || message.includes("soon")) {
      return sampleResponses.expiring;
    } else if (message.includes("territory") || message.includes("oppo")) {
      return sampleResponses.territory;
    } else if (message.includes("payment")) {
      return sampleResponses.payment;
    } else if (message.includes("negotiation") || message.includes("xiaomi")) {
      return sampleResponses.negotiation;
    } else {
      return "I understand you're asking about contract terms. Based on your current contracts, I can provide insights on margins, SLAs, territories, payment terms, and negotiation strategies. Could you be more specific about what aspect you'd like to explore?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePredefinedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gradient">AI Contract Assistant</h1>
            <p className="text-muted-foreground mt-2">
              Ask questions about your contracts and get intelligent insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="card-elevated h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contract Analysis Chat
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === "bot" && (
                            <Bot className="h-5 w-5 mt-0.5 text-primary" />
                          )}
                          {message.sender === "user" && (
                            <User className="h-5 w-5 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p className="text-xs opacity-70 mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-5 w-5 text-primary" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about contracts, margins, SLAs, territories..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Questions */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {predefinedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left h-auto p-3 whitespace-normal"
                      onClick={() => handlePredefinedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Contract term analysis</li>
                  <li>• Margin comparisons</li>
                  <li>• SLA requirements</li>
                  <li>• Territory mapping</li>
                  <li>• Payment term tracking</li>
                  <li>• Negotiation insights</li>
                  <li>• Risk identification</li>
                  <li>• Market comparisons</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;