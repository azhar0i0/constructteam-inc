import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Calendar, Hash } from "lucide-react";
import { ProjectDetails } from "@/types/estimate";

interface ProjectDetailsStepProps {
  data: ProjectDetails;
  onChange: (data: ProjectDetails) => void;
}

export const ProjectDetailsStep = ({ data, onChange }: ProjectDetailsStepProps) => {
  const handleChange = (field: keyof ProjectDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2 animate-in fade-in duration-500 delay-150">
        <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-full flex items-center justify-center mx-auto shadow-xl animate-in zoom-in duration-500 delay-300">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-in slide-in-from-bottom-2 duration-500 delay-200">
          Project Details
        </h2>
        <p className="text-muted-foreground text-lg animate-in slide-in-from-bottom-2 duration-500 delay-250">
          Tell us about the project you're estimating
        </p>
      </div>

      <Card className="shadow-xl border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl animate-in slide-in-from-bottom-3 duration-500 delay-400" style={{ background: 'var(--gradient-card)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Project Information
          </CardTitle>
          <CardDescription>
            Provide details about the project and estimate parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 animate-in slide-in-from-left-2 duration-300 delay-500">
            <Label htmlFor="project-title" className="text-sm font-medium">
              Project Title *
            </Label>
            <Input
              id="project-title"
              placeholder="e.g., Complete Website Redesign & Development"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
            />
          </div>

          <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-300 delay-600">
            <Label htmlFor="project-description" className="text-sm font-medium">
              Project Description *
            </Label>
            <Textarea
              id="project-description"
              placeholder="Provide a detailed description of the project scope, deliverables, and objectives..."
              value={data.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="min-h-[120px] shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 resize-none focus:shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 animate-in slide-in-from-left-2 duration-300 delay-700">
              <Label htmlFor="estimate-number" className="text-sm font-medium flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" />
                Estimate Number
              </Label>
              <Input
                id="estimate-number"
                placeholder="EST-2024-001"
                value={data.estimateNumber}
                readOnly
                className="h-12 shadow-sm border-0 bg-muted/50 text-muted-foreground cursor-not-allowed transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2 animate-in slide-in-from-right-2 duration-300 delay-800">
              <Label htmlFor="valid-until" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Valid Until
              </Label>
              <Input
                id="valid-until"
                type="date"
                value={data.validUntil}
                onChange={(e) => handleChange('validUntil', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
              />
            </div>
          </div>

          <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 animate-in fade-in duration-300 delay-900">
            <h4 className="font-medium text-accent mb-2">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
              A clear project description helps set expectations and reduces scope creep. 
              Include key deliverables, timelines, and any important assumptions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};