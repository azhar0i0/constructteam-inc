import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Search, FileText, ArrowLeft, Copy, Trash2, Eye, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EstimateData } from "@/types/estimate";

interface SavedEstimate extends EstimateData {
  id: string;
  createdAt: string;
  total: number;
}

export const RecentsPage = () => {
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState<SavedEstimate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstimate, setSelectedEstimate] = useState<SavedEstimate | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('saved-estimates');
    if (saved) {
      setEstimates(JSON.parse(saved));
    }
  }, []);

  const filteredEstimates = estimates.filter(
    estimate =>
      estimate.project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.client.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteEstimate = (id: string) => {
    const updated = estimates.filter(est => est.id !== id);
    setEstimates(updated);
    localStorage.setItem('saved-estimates', JSON.stringify(updated));
  };

  const duplicateEstimate = (estimate: SavedEstimate) => {
    const newEstimate = {
      ...estimate,
      id: `EST-${Date.now()}`,
      createdAt: new Date().toISOString(),
      project: {
        ...estimate.project,
        title: `${estimate.project.title} (Copy)`,
        estimateNumber: `EST-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`
      }
    };
    
    // Store the duplicated estimate for editing
    localStorage.setItem('current-estimate', JSON.stringify(newEstimate));
    navigate('/create');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Recent Estimates
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">Manage your saved estimates</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
              {estimates.length} {estimates.length === 1 ? 'Estimate' : 'Estimates'}
            </Badge>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search estimates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {filteredEstimates.length === 0 ? (
          <Card className="max-w-2xl mx-auto text-center py-8 sm:py-12">
            <CardContent className="px-4 sm:px-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {estimates.length === 0 ? 'No estimates yet' : 'No matching estimates'}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                {estimates.length === 0 
                  ? 'Create your first estimate to get started'
                  : 'Try adjusting your search terms'
                }
              </p>
              {estimates.length === 0 && (
                <Button onClick={() => navigate('/create')} size="lg">
                  Create First Estimate
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEstimates.map((estimate) => (
              <Card 
                key={estimate.id} 
                className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-secondary/20"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg font-semibold text-foreground mb-1 truncate">
                        {estimate.project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-2 truncate">
                        {estimate.client.companyName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>{new Date(estimate.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg sm:text-xl font-bold text-primary">
                        {formatCurrency(estimate.total)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {estimate.sections.flatMap(s => s.lineItems).length} items
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Estimate Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          {/* Project Info */}
                          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">{estimate.project.title}</h3>
                            <p className="text-muted-foreground mb-2">{estimate.project.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Estimate #:</span> {estimate.project.estimateNumber}
                              </div>
                              <div>
                                <span className="font-medium">Created:</span> {new Date(estimate.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          {/* Client Info */}
                          <div>
                            <h4 className="font-semibold mb-2">Client Information</h4>
                            <div className="bg-secondary/20 p-4 rounded-lg">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Company:</span> {estimate.client.companyName}
                                </div>
                                <div>
                                  <span className="font-medium">Contact:</span> {estimate.client.contactName}
                                </div>
                                <div>
                                  <span className="font-medium">Email:</span> {estimate.client.email}
                                </div>
                                <div>
                                  <span className="font-medium">Phone:</span> {estimate.client.phone}
                                </div>
                              </div>
                              <div className="mt-2">
                                <span className="font-medium">Address:</span> {estimate.client.address}
                              </div>
                            </div>
                          </div>

                          {/* Services */}
                          <div>
                            <h4 className="font-semibold mb-2">Services & Pricing</h4>
                            <div className="space-y-4">
                              {estimate.sections.map((section, sectionIndex) => (
                                <div key={section.id} className="space-y-2">
                                  <h5 className="font-medium text-primary">{section.title}</h5>
                                  {section.lineItems.map((item, index) => (
                                    <div key={index} className="bg-secondary/20 p-3 rounded-lg ml-4">
                                      <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                          <p className="font-medium">{item.description}</p>
                                          <p className="text-sm text-muted-foreground">
                                            {item.quantity} × {formatCurrency(item.rate)}
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-semibold">{formatCurrency(item.amount)}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                            
                            {/* Total */}
                            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm text-muted-foreground">Subtotal: {formatCurrency(estimate.sections.flatMap(s => s.lineItems).reduce((sum, item) => sum + item.amount, 0))}</p>
                                  <p className="text-sm text-muted-foreground">Tax ({(estimate.taxRate * 100).toFixed(1)}%): {formatCurrency(estimate.sections.flatMap(s => s.lineItems).reduce((sum, item) => sum + item.amount, 0) * estimate.taxRate)}</p>
                                </div>
                                <p className="text-xl font-bold text-primary">{formatCurrency(estimate.total)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => duplicateEstimate(estimate)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteEstimate(estimate.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};