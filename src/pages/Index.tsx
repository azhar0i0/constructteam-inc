import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, FileText, DollarSign } from "lucide-react";

const Index = () => {
  const lineItems = [
    { id: 1, description: "Website Design & Development", quantity: 1, rate: 2500.00, amount: 2500.00 },
    { id: 2, description: "Logo Design & Branding", quantity: 1, rate: 800.00, amount: 800.00 },
    { id: 3, description: "Content Management System", quantity: 1, rate: 1200.00, amount: 1200.00 },
    { id: 4, description: "SEO Optimization", quantity: 1, rate: 600.00, amount: 600.00 },
    { id: 5, description: "Mobile Responsive Design", quantity: 1, rate: 400.00, amount: 400.00 },
  ];

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-secondary/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-0">
            {/* Header Section */}
            <div className="bg-primary text-primary-foreground p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">ESTIMATE</h1>
                  <div className="space-y-1 text-primary-foreground/90">
                    <p className="text-lg font-semibold">GreenTech Solutions</p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>contact@greentech.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>123 Business St, City, State 12345</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-white/20 text-white mb-4">
                    EST-2024-001
                  </Badge>
                  <div className="space-y-2 text-primary-foreground/90">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Date: March 15, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Valid Until: April 15, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="p-8 border-b">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Bill To:</h2>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold text-lg">Acme Corporation</p>
                <p className="text-muted-foreground">John Smith</p>
                <p className="text-muted-foreground">123 Client Avenue</p>
                <p className="text-muted-foreground">Business City, State 54321</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-muted-foreground">john@acmecorp.com</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">+1 (555) 987-6543</span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-8 border-b">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Project Details:</h2>
              <div className="bg-accent/10 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-accent">Complete Website Redesign & Development</h3>
                <p className="text-muted-foreground mt-2">
                  Comprehensive website redesign including modern UI/UX design, responsive development, 
                  content management system integration, and SEO optimization for improved online presence.
                </p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="p-8">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Services & Pricing:</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-primary/20">
                      <th className="text-left py-3 text-foreground font-semibold">Description</th>
                      <th className="text-center py-3 text-foreground font-semibold w-20">Qty</th>
                      <th className="text-right py-3 text-foreground font-semibold w-28">Rate</th>
                      <th className="text-right py-3 text-foreground font-semibold w-32">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.id} className="border-b border-muted hover:bg-muted/30 transition-colors">
                        <td className="py-4 text-foreground">{item.description}</td>
                        <td className="py-4 text-center text-muted-foreground">{item.quantity}</td>
                        <td className="py-4 text-right text-muted-foreground">${item.rate.toFixed(2)}</td>
                        <td className="py-4 text-right font-semibold text-foreground">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="mt-8 flex justify-end">
                <div className="w-full max-w-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Tax (8%):</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between py-3 text-lg">
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

            {/* Terms & Conditions */}
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
                    Estimated completion time: 4-6 weeks from project start date. 
                    Timeline may vary based on client feedback and content delivery.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This estimate includes all specified services. Any additional features 
                  or changes requested during the project will be quoted separately. Please review all details 
                  carefully and contact us with any questions.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-8 border-t">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Thank you for considering our services. We look forward to working with you!
                </p>
                <div className="flex gap-3">
                  <Button variant="outline">Download PDF</Button>
                  <Button>Accept Estimate</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;