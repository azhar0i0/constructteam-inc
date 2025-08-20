import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { CompanyInfo } from "@/types/estimate";

interface CompanyInfoStepProps {
  data: CompanyInfo;
  onChange: (data: CompanyInfo) => void;
}

export const CompanyInfoStep = ({ data, onChange }: CompanyInfoStepProps) => {
  const handleChange = (field: keyof CompanyInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Company Information
        </h2>
        <p className="text-muted-foreground text-lg">
          Let's start with your business details
        </p>
      </div>

      <Card className="shadow-lg border-0" style={{ background: 'var(--gradient-card)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Your Business Details
          </CardTitle>
          <CardDescription>
            This information will appear on your estimates as the sender
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company-name" className="text-sm font-medium">
              Company Name *
            </Label>
            <Input
              id="company-name"
              placeholder="Your Company Name"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@company.com"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Business Address
            </Label>
            
            <div className="space-y-3">
              <Input
                placeholder="Street Address"
                value={data.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
              />
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Input
                  placeholder="City"
                  value={data.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
                />
                <Input
                  placeholder="State"
                  value={data.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
                />
                <Input
                  placeholder="ZIP Code"
                  value={data.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value)}
                  className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};