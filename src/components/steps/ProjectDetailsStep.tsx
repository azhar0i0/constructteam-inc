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
    <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto shadow-lg">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Project Details
        </h2>
        <p className="text-muted-foreground text-lg">
          Tell us about the project you're estimating
        </p>
      </div>

      <Card className="shadow-lg border-0" style={{ background: 'var(--gradient-card)' }}>
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
          <div className="space-y-2">
            <Label htmlFor="project-title" className="text-sm font-medium">
              Project Title *
            </Label>
            <Input
              id="project-title"
              placeholder="e.g., Complete Website Redesign & Development"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description" className="text-sm font-medium">
              Project Description *
            </Label>
            <Textarea
              id="project-description"
              placeholder="Provide a detailed description of the project scope, deliverables, and objectives..."
              value={data.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="min-h-[120px] shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimate-number" className="text-sm font-medium flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" />
                Estimate Number
              </Label>
              <Input
                id="estimate-number"
                placeholder="EST-2024-001"
                value={data.estimateNumber}
                onChange={(e) => handleChange('estimateNumber', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="valid-until" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Valid Until
              </Label>
              <Input
                id="valid-until"
                type="date"
                value={data.validUntil}
                onChange={(e) => handleChange('validUntil', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
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