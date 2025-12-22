import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, FileText, DollarSign, CheckCircle, Download, Send } from "lucide-react";
import { TermsConditionsSettings } from "@/components/TermsConditionsSettings";
import { generateEstimatePDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";
import { EstimateData } from "@/types/estimate";

interface ReviewStepProps {
  data: EstimateData;
  onUpdateTerms?: (terms: any) => void;
}

export const ReviewStep = ({ data, onUpdateTerms }: ReviewStepProps) => {
  const allLineItems = data.sections.flatMap(section => section.lineItems);
  const subtotal = allLineItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * data.taxRate;
  const total = subtotal + tax;

  const handleDownload = async () => {
    try {
      toast("Generating PDF...", { duration: 2000 });
      await generateEstimatePDF('estimate-content', data);
      toast("PDF downloaded successfully!", { duration: 3000 });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast("Failed to generate PDF. Please try again.", { duration: 3000 });
    }
  };

  const handleSendEmail = () => {
    // Here you would implement email sending
    console.log('Send estimate via email');
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 sm:px-4">
      <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6 animate-in fade-in duration-500 delay-150 px-2 sm:px-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-full flex items-center justify-center mx-auto shadow-2xl animate-in zoom-in duration-500 delay-300 hover-scale">
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2 sm:mb-3 animate-in slide-in-from-bottom-2 duration-500 delay-200">
            Estimate Complete!
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto animate-in slide-in-from-bottom-2 duration-500 delay-250 px-4">
            Review your estimate below and download or send it to your client
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center max-w-xs sm:max-w-md lg:max-w-2xl mx-auto animate-in slide-in-from-bottom-2 duration-500 delay-400">
          <Button onClick={handleDownload} size="lg" className="shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] w-full sm:w-auto h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg">
            <Download className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">Download</span>
          </Button>
          <TermsConditionsSettings
            termsData={data.termsConditions}
            onSave={onUpdateTerms || (() => {})}
          />
        </div>
      </div>

      <Card className="shadow-xl border-0 max-w-7xl mx-auto animate-in fade-in duration-700 delay-300" id="estimate-content">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-accent text-white p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="w-full lg:w-auto">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3">ESTIMATE</h1>
                <div className="space-y-1 text-white/90 text-xs sm:text-sm md:text-base">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">{data.company.name}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="break-all">{data.company.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{data.company.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">
                      {data.company.address}, {data.company.city}, {data.company.state} {data.company.zipCode}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-auto lg:text-right">
                <Badge variant="secondary" className="bg-white/20 text-white mb-3 sm:mb-4 text-xs sm:text-sm">
                  {data.project.estimateNumber}
                </Badge>
                <div className="space-y-2 text-white/90 text-sm">
                  <div className="flex items-center gap-2 lg:justify-end">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Date: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 lg:justify-end">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Valid Until: {new Date(data.project.validUntil).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 border-b bg-secondary/20">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Bill To:</h2>
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-sm">
              <p className="font-semibold text-base sm:text-lg lg:text-xl">{data.client.companyName}</p>
              <p className="text-muted-foreground text-sm sm:text-base">{data.client.contactName}</p>
              <p className="text-muted-foreground text-sm sm:text-base">
                {data.client.address}, {data.client.city}, {data.client.state} {data.client.zipCode}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2">
                <span className="text-muted-foreground text-sm sm:text-base break-all">{data.client.email}</span>
                {data.client.phone && (
                  <>
                    <span className="text-muted-foreground hidden sm:inline">•</span>
                    <span className="text-muted-foreground text-sm sm:text-base">{data.client.phone}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 border-b bg-white">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Project Details:</h2>
            <div className="bg-accent/10 p-3 sm:p-4 md:p-6 rounded-lg border border-accent/20">
              <h3 className="font-semibold text-base sm:text-lg lg:text-xl text-accent mb-2 sm:mb-3">{data.project.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{data.project.description}</p>
            </div>
          </div>

          {/* Services Table */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-secondary/10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Services & Pricing:</h2>
            <div className="space-y-4 sm:space-y-6">
              {data.sections.map((section, sectionIndex) => (
                <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-primary/5 px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-b">
                    <h3 className="font-semibold text-base sm:text-lg lg:text-xl text-primary">{section.title}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <tbody>
                        {section.lineItems.map((item, index) => (
                          <tr key={item.id} className="border-b border-muted/50 hover:bg-secondary/20 transition-colors">
                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                              <div className="space-y-1">
                                <div className="text-foreground font-semibold text-xs sm:text-sm lg:text-base">{item.name}</div>
                                <div className="text-muted-foreground text-xs sm:text-sm">{item.description}</div>
                              </div>
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 text-center text-muted-foreground text-xs sm:text-sm lg:text-base">{item.quantity}</td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-muted-foreground text-xs sm:text-sm lg:text-base">${item.rate.toFixed(2)}</td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold text-foreground text-xs sm:text-sm lg:text-base">${item.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="mt-6 sm:mt-8 flex justify-center lg:justify-end">
              <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-sm">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between py-1 sm:py-2">
                    <span className="text-muted-foreground text-xs sm:text-sm lg:text-base">Subtotal:</span>
                    <span className="font-semibold text-xs sm:text-sm lg:text-base">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2">
                    <span className="text-muted-foreground text-xs sm:text-sm lg:text-base">Tax ({(data.taxRate * 100).toFixed(1)}%):</span>
                    <span className="font-semibold text-xs sm:text-sm lg:text-base">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between py-2 sm:py-3 text-sm sm:text-base lg:text-lg bg-primary/5 px-2 sm:px-4 rounded-lg">
                    <span className="font-bold text-primary flex items-center gap-1 sm:gap-2">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                      Total:
                    </span>
                    <span className="font-bold text-primary text-base sm:text-lg lg:text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Terms Section */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 border-t bg-secondary/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div>
                <h3 className="font-semibold mb-2 sm:mb-3 text-foreground text-sm sm:text-base lg:text-lg">Payment Information:</h3>
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-foreground">Accepted Methods:</span>
                      <p className="text-sm text-muted-foreground">
                        {data.paymentInfo.acceptedMethods.join(', ') || 'Bank Transfer, Check'}
                      </p>
                    </div>
                    {data.paymentInfo.bankName && (
                      <div>
                        <span className="text-sm font-medium text-foreground">Bank:</span>
                        <p className="text-sm text-muted-foreground">{data.paymentInfo.bankName}</p>
                      </div>
                    )}
                    {data.paymentInfo.accountName && (
                      <div>
                        <span className="text-sm font-medium text-foreground">Account Name:</span>
                        <p className="text-sm text-muted-foreground">{data.paymentInfo.accountName}</p>
                      </div>
                    )}
                    {data.paymentInfo.paypalEmail && (
                      <div>
                        <span className="text-sm font-medium text-foreground">PayPal:</span>
                        <p className="text-sm text-muted-foreground">{data.paymentInfo.paypalEmail}</p>
                      </div>
                    )}
                    {data.paymentInfo.notes && (
                      <div>
                        <span className="text-sm font-medium text-foreground">Notes:</span>
                        <p className="text-sm text-muted-foreground">{data.paymentInfo.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 sm:mb-3 text-foreground text-sm sm:text-base lg:text-lg">Terms & Conditions:</h3>
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {data.termsConditions.notes}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};