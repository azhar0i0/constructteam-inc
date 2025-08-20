import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ClientInfoStep } from "./steps/ClientInfoStep";
import { ProjectDetailsStep } from "./steps/ProjectDetailsStep";
import { LineItemsStep } from "./steps/LineItemsStep";
import { ReviewStep } from "./steps/ReviewStep";
import { CompanySettings } from "./CompanySettings";
import { 
  EstimateData, 
  defaultCompanyInfo, 
  defaultClientInfo, 
  defaultProjectDetails 
} from "@/types/estimate";

const steps = [
  { title: "Client Info", description: "Client information" },
  { title: "Project Details", description: "Project description" },
  { title: "Services", description: "Line items & pricing" },
  { title: "Review", description: "Final estimate" },
];

export const EstimateWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [estimateData, setEstimateData] = useState<EstimateData>({
    company: defaultCompanyInfo,
    client: defaultClientInfo,
    project: defaultProjectDetails,
    sections: [],
    taxRate: 0.08,
  });

  // Load company info from localStorage on mount
  useEffect(() => {
    const savedCompany = localStorage.getItem('company-info');
    if (savedCompany) {
      const companyData = JSON.parse(savedCompany);
      setEstimateData(prev => ({ ...prev, company: companyData }));
    }

    // Load current estimate if returning from recent page
    const currentEstimate = localStorage.getItem('current-estimate');
    if (currentEstimate) {
      setEstimateData(JSON.parse(currentEstimate));
      localStorage.removeItem('current-estimate');
    }
  }, []);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(estimateData.client.companyName && estimateData.client.contactName && estimateData.client.email);
      case 1:
        return !!(estimateData.project.title && estimateData.project.description);
      case 2:
        return estimateData.sections.length > 0 && estimateData.sections.every(section => section.lineItems.length > 0 && section.lineItems.every(item => item.description && item.rate > 0));
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ClientInfoStep
            data={estimateData.client}
            onChange={(client) => setEstimateData({ ...estimateData, client })}
          />
        );
      case 1:
        return (
          <ProjectDetailsStep
            data={estimateData.project}
            onChange={(project) => setEstimateData({ ...estimateData, project })}
          />
        );
      case 2:
        return (
          <LineItemsStep
            data={estimateData.sections}
            taxRate={estimateData.taxRate}
            onChange={(sections) => setEstimateData({ ...estimateData, sections })}
            onTaxRateChange={(taxRate) => setEstimateData({ ...estimateData, taxRate })}
          />
        );
      case 3:
        return <ReviewStep data={estimateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/5 transition-all duration-500">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-primary/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group w-full sm:w-auto" onClick={() => navigate('/')}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200 truncate">
                    ConstructTeam INC
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Professional Construction Estimates</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <CompanySettings 
                  companyData={estimateData.company}
                  onSave={(company) => setEstimateData({ ...estimateData, company })}
                />
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm whitespace-nowrap">
                  <span className="hidden sm:inline">Step </span>{currentStep + 1} of {steps.length}
                </Badge>
              </div>
            </div>
          
            <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">Progress</span>
              <span className="text-xs sm:text-sm font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5 sm:h-2" />
            
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center transition-all duration-300 flex-1 sm:flex-none ${
                    index <= currentStep ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      index < currentStep
                        ? 'bg-primary text-white'
                        : index === currentStep
                        ? 'bg-primary text-white ring-2 sm:ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="mt-1 sm:mt-2">
                    <p className="text-[10px] sm:text-xs font-medium leading-tight">{step.title}</p>
                    <p className="text-[9px] sm:text-xs text-muted-foreground hidden sm:block leading-tight">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        {currentStep < 3 && (
          <Card className="max-w-4xl mx-auto shadow-lg border-0" style={{ background: 'var(--gradient-card)' }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 w-full sm:w-auto order-2 sm:order-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="text-center order-1 sm:order-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {isStepValid(currentStep) ? (
                      <span className="text-primary font-medium">✓ Step completed</span>
                    ) : (
                      "Please fill in all required fields"
                    )}
                  </p>
                </div>

                <Button
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className="flex items-center gap-2 shadow-sm w-full sm:w-auto order-3"
                >
                  {currentStep === steps.length - 2 ? 'Generate Estimate' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <div className="text-center mt-6 sm:mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/recent')}
                className="shadow-lg w-full sm:w-auto"
              >
                View Recent
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(0)}
                className="shadow-lg w-full sm:w-auto"
              >
                Create New Estimate
              </Button>
              <Button
                onClick={() => {
                  // Calculate totals for estimate completion
                  const allLineItems = estimateData.sections.flatMap(section => section.lineItems);
                  const subtotal = allLineItems.reduce((sum, item) => sum + item.amount, 0);
                  
                  // Save estimate to localStorage
                  const savedEstimates = JSON.parse(localStorage.getItem('saved-estimates') || '[]');
                  const newEstimate = {
                    ...estimateData,
                    id: estimateData.project.estimateNumber,
                    createdAt: new Date().toISOString(),
                    total: subtotal * (1 + estimateData.taxRate)
                  };
                  savedEstimates.push(newEstimate);
                  localStorage.setItem('saved-estimates', JSON.stringify(savedEstimates));
                  setCurrentStep(0);
                }}
                className="shadow-lg w-full sm:w-auto"
              >
                Save & Create New
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};