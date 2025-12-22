import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Mail, Phone, MapPin } from "lucide-react";
import { ClientInfo } from "@/types/estimate";

interface ClientInfoStepProps {
  data: ClientInfo;
  onChange: (data: ClientInfo) => void;
}

export const ClientInfoStep = ({ data, onChange }: ClientInfoStepProps) => {
  const handleChange = (field: keyof ClientInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2 animate-in fade-in duration-500 delay-150">
        <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-full flex items-center justify-center mx-auto shadow-xl animate-in zoom-in duration-500 delay-300">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-in slide-in-from-bottom-2 duration-500 delay-200">
          Client Information
        </h2>
        <p className="text-muted-foreground text-lg animate-in slide-in-from-bottom-2 duration-500 delay-250">
          Who are you creating this estimate for?
        </p>
      </div>

      <Card className="shadow-xl border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl animate-in slide-in-from-bottom-3 duration-500 delay-400" style={{ background: 'var(--gradient-card)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Client Details
          </CardTitle>
          <CardDescription>
            Enter your client's information for the estimate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 animate-in slide-in-from-left-2 duration-300 delay-500">
              <Label htmlFor="client-company" className="text-sm font-medium">
                Organization/Client *
              </Label>
              <Input
                id="client-company"
                placeholder="Client Company Name"
                value={data.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
              />
            </div>
            
            <div className="space-y-2 animate-in slide-in-from-right-2 duration-300 delay-600">
              <Label htmlFor="contact-name" className="text-sm font-medium">
                Contact Person *
              </Label>
              <Input
                id="contact-name"
                placeholder="Contact Name"
                value={data.contactName}
                onChange={(e) => handleChange('contactName', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 animate-in slide-in-from-left-2 duration-300 delay-700">
              <Label htmlFor="client-email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address *
              </Label>
              <Input
                id="client-email"
                type="email"
                placeholder="client@company.com"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
              />
            </div>
            
            <div className="space-y-2 animate-in slide-in-from-right-2 duration-300 delay-800">
              <Label htmlFor="client-phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="client-phone"
                placeholder="+1 (555) 987-6543"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
              />
            </div>
          </div>

          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300 delay-900">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Client Address
            </Label>
            
            <div className="space-y-3">
              <Input
                placeholder="Street Address"
                value={data.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
              />
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Input
                  placeholder="City"
                  value={data.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
                />
                <Input
                  placeholder="State"
                  value={data.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
                />
                <Input
                  placeholder="ZIP Code"
                  value={data.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value)}
                  className="h-12 shadow-sm border-0 bg-white/80 focus:bg-white transition-all duration-200 focus:shadow-md"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};