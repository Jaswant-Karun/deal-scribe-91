import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, ArrowLeft, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContractUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Simulate extraction complete
          setTimeout(() => {
            setExtractedData({
              fileName: file.name,
              brand: "Apple",
              model: "iPhone 17 Pro",
              margin: "12%",
              sla: "12 hours",
              territory: ["California", "Nevada", "Oregon"],
              expiry: "2026-08-15",
              clauses: [
                "Minimum order quantity: 10,000 units",
                "Payment terms: Net 30 days",
                "Service level agreement: 12 hours response time",
                "Territory exclusivity: West Coast USA",
                "Margin protection: 12% minimum"
              ]
            });
            setIsUploading(false);
            toast({
              title: "Contract Extracted Successfully",
              description: "All contract terms have been analyzed and extracted.",
            });
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadJSON = () => {
    if (extractedData) {
      const dataStr = JSON.stringify(extractedData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `${extractedData.fileName.replace('.pdf', '')}_extracted.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
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
            <h1 className="text-3xl font-bold text-gradient">Contract Upload & Extraction</h1>
            <p className="text-muted-foreground mt-2">
              Upload PDF contracts to automatically extract terms and conditions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Contract
              </CardTitle>
              <CardDescription>
                Select a PDF contract file to analyze and extract key terms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload PDF Contract</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="contract-upload"
                  disabled={isUploading}
                />
                <label htmlFor="contract-upload">
                  <Button asChild className="cursor-pointer">
                    <span>Choose File</span>
                  </Button>
                </label>
              </div>

              {isUploading && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Processing...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Extracting contract terms and analyzing clauses...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Extraction Results */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Extraction Results
              </CardTitle>
              <CardDescription>
                Automatically extracted contract information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!extractedData ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Upload a contract to see extracted data here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Contract Analysis Complete</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadJSON}
                      className="flex items-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download JSON
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">Brand</p>
                      <p className="font-semibold">{extractedData.brand}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">Model</p>
                      <p className="font-semibold">{extractedData.model}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">Margin</p>
                      <p className="font-semibold text-success">{extractedData.margin}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">SLA</p>
                      <p className="font-semibold text-primary">{extractedData.sla}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Territory</p>
                    <div className="flex flex-wrap gap-2">
                      {extractedData.territory.map((territory: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                        >
                          {territory}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Key Clauses</p>
                    <ul className="text-sm space-y-1">
                      {extractedData.clauses.map((clause: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {clause}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="card-elevated mt-8">
          <CardHeader>
            <CardTitle>AI-Powered Contract Analysis Features</CardTitle>
            <CardDescription>
              Our advanced AI automatically extracts and analyzes contract data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Smart Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically identifies key terms, clauses, and conditions
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Data Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Validates extracted data for accuracy and completeness
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Export Options</h3>
                <p className="text-sm text-muted-foreground">
                  Export data in JSON, CSV, or integrate with your systems
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContractUpload;