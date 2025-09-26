import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Apple, Zap, CircleDot, Hexagon } from "lucide-react";

const brands = [
  {
    id: "apple",
    name: "Apple",
    icon: Apple,
    color: "bg-black hover:bg-gray-800",
    description: "iPhone, iPad, Mac",
    gradient: "from-gray-900 to-black",
  },
  {
    id: "samsung",
    name: "Samsung",
    icon: Smartphone,
    color: "bg-blue-600 hover:bg-blue-700",
    description: "Galaxy, Note, Tab",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    id: "oppo",
    name: "Oppo",
    icon: CircleDot,
    color: "bg-green-600 hover:bg-green-700",
    description: "Reno, Find, A-Series",
    gradient: "from-green-600 to-green-800",
  },
  {
    id: "vivo",
    name: "Vivo",
    icon: Hexagon,
    color: "bg-purple-600 hover:bg-purple-700",
    description: "V-Series, Y-Series, X-Series",
    gradient: "from-purple-600 to-purple-800",
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    icon: Zap,
    color: "bg-orange-600 hover:bg-orange-700",
    description: "Mi, Redmi, POCO",
    gradient: "from-orange-600 to-orange-800",
  },
];

const BrandSelector = () => {
  const navigate = useNavigate();

  const handleBrandSelect = (brandId: string) => {
    // Store selected brand in localStorage for the dashboard
    localStorage.setItem("selectedBrand", brandId);
    navigate(`/dashboard/${brandId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Brand Focus
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Select the mobile brand you want to focus on for contract analysis and management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {brands.map((brand, index) => (
            <Card
              key={brand.id}
              className="card-brand bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleBrandSelect(brand.id)}
            >
              <CardContent className="p-8 text-center">
                <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${brand.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <brand.icon className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {brand.name}
                </h3>
                
                <p className="text-white/70 mb-4">
                  {brand.description}
                </p>
                
                <div className="text-sm text-white/60">
                  Click to select
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/60">
            You can change your brand focus anytime from the dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandSelector;