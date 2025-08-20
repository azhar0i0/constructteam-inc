import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, FileText, DollarSign, CheckCircle, Download, Send } from "lucide-react";
import { EstimateData } from "@/types/estimate";

interface ReviewStepProps {
  data: EstimateData;
}

export const ReviewStep = ({ data }: ReviewStepProps) => {
  const allLineItems = data.sections.flatMap(section => section.lineItems);
  const subtotal = allLineItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * data.taxRate;
  const total = subtotal + tax;

  const handleDownload = () => {
    // Here you would implement PDF generation
    console.log('Download estimate PDF');
  };

  const handleSendEmail = () => {
    // Here you would implement email sending
    console.log('Send estimate via email');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4 animate-in fade-in duration-500 delay-150">
        <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-full flex items-center justify-center mx-auto shadow-2xl animate-in zoom-in duration-500 delay-300">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2 animate-in slide-in-from-bottom-2 duration-500 delay-200">
            Estimate Complete!
          </h2>
          <p className="text-muted-foreground text-lg animate-in slide-in-from-bottom-2 duration-500 delay-250">
            Review your estimate below and download or send it to your client
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-in slide-in-from-bottom-2 duration-500 delay-400">
          <Button onClick={handleDownload} size="lg" className="shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button onClick={handleSendEmail} variant="outline" size="lg" className="shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <Send className="w-4 h-4 mr-2" />
            Send via Email
          </Button>
        </div>
      </div>

      <Card className="shadow-xl border-0 max-w-4xl mx-auto">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-accent text-white p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">ESTIMATE</h1>
                <div className="space-y-1 text-white/90">
                  <p className="text-lg font-semibold">{data.company.name}</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{data.company.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{data.company.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {data.company.address}, {data.company.city}, {data.company.state} {data.company.zipCode}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="bg-white/20 text-white mb-4">
                  {data.project.estimateNumber}
                </Badge>
                <div className="space-y-2 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Valid Until: {new Date(data.project.validUntil).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="p-8 border-b bg-secondary/20">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Bill To:</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="font-semibold text-lg">{data.client.companyName}</p>
              <p className="text-muted-foreground">{data.client.contactName}</p>
              <p className="text-muted-foreground">
                {data.client.address}, {data.client.city}, {data.client.state} {data.client.zipCode}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-muted-foreground">{data.client.email}</span>
                {data.client.phone && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{data.client.phone}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-8 border-b bg-white">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Project Details:</h2>
            <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
              <h3 className="font-semibold text-lg text-accent mb-3">{data.project.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{data.project.description}</p>
            </div>
          </div>

          {/* Services Table */}
          <div className="p-8 bg-secondary/10">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Services & Pricing:</h2>
            <div className="space-y-6">
              {data.sections.map((section, sectionIndex) => (
                <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-primary/5 px-6 py-3 border-b">
                    <h3 className="font-semibold text-lg text-primary">{section.title}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-muted">
                          <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
                          <th className="text-center py-3 px-4 text-foreground font-semibold w-20">Qty</th>
                          <th className="text-right py-3 px-4 text-foreground font-semibold w-28">Rate</th>
                          <th className="text-right py-3 px-4 text-foreground font-semibold w-32">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.lineItems.map((item, index) => (
                          <tr key={item.id} className="border-b border-muted/50 hover:bg-secondary/20 transition-colors">
                            <td className="py-3 px-4 text-foreground font-medium">{item.description}</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">{item.quantity}</td>
                            <td className="py-3 px-4 text-right text-muted-foreground">${item.rate.toFixed(2)}</td>
                            <td className="py-3 px-4 text-right font-semibold text-foreground">${item.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="mt-8 flex justify-end">
              <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Tax ({(data.taxRate * 100).toFixed(1)}%):</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between py-3 text-lg bg-primary/5 px-4 rounded-lg">
                    <span className="font-bold text-primary flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Total:
                    </span>
                    <span className="font-bold text-primary text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Footer */}
          <div className="p-8 border-t bg-secondary/30">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Terms & Conditions:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Estimate valid for 30 days</li>
                  <li>• 50% deposit required to begin work</li>
                  <li>• Final payment due upon project completion</li>
                  <li>• Additional changes may incur extra charges</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Project Timeline:</h3>
                <p className="text-sm text-muted-foreground">
                  Estimated completion time will be discussed upon project acceptance. 
                  Timeline may vary based on client feedback and content delivery.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This estimate includes all specified services. Any additional features 
                or changes requested during the project will be quoted separately. Please review all details 
                carefully and contact us with any questions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};