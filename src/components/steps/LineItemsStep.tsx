import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Trash2, Calculator } from "lucide-react";
import { LineItem } from "@/types/estimate";

interface LineItemsStepProps {
  data: LineItem[];
  taxRate: number;
  onChange: (data: LineItem[]) => void;
  onTaxRateChange: (rate: number) => void;
}

export const LineItemsStep = ({ data, taxRate, onChange, onTaxRateChange }: LineItemsStepProps) => {
  const addLineItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    onChange([...data, newItem]);
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    const updatedItems = data.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = Number(updated.quantity) * Number(updated.rate);
        }
        return updated;
      }
      return item;
    });
    onChange(updatedItems);
  };

  const removeLineItem = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const subtotal = data.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const predefinedServices = [
    { description: "Website Design & Development", rate: 2500 },
    { description: "Logo Design & Branding", rate: 800 },
    { description: "Content Management System", rate: 1200 },
    { description: "SEO Optimization", rate: 600 },
    { description: "Mobile Responsive Design", rate: 400 },
    { description: "E-commerce Integration", rate: 1500 },
    { description: "Custom WordPress Theme", rate: 1000 },
    { description: "Social Media Integration", rate: 300 },
  ];

  const addPredefinedService = (service: { description: string; rate: number }) => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: service.description,
      quantity: 1,
      rate: service.rate,
      amount: service.rate,
    };
    onChange([...data, newItem]);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto shadow-lg">
          <ShoppingCart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Services & Pricing
        </h2>
        <p className="text-muted-foreground text-lg">
          Add the services you'll be providing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-lg border-0" style={{ background: 'var(--gradient-card)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Line Items
              </CardTitle>
              <CardDescription>
                Add and customize your services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No services added yet. Click "Add Service" to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.map((item, index) => (
                    <div key={item.id} className="bg-white/60 p-4 rounded-lg border border-primary/10">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Service #{index + 1}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLineItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-6">
                          <Label className="text-sm font-medium">Description</Label>
                          <Input
                            placeholder="Service description"
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                            className="mt-1 h-10 border-0 bg-white shadow-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-sm font-medium">Qty</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                            className="mt-1 h-10 border-0 bg-white shadow-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-sm font-medium">Rate</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.rate}
                            onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                            className="mt-1 h-10 border-0 bg-white shadow-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-sm font-medium">Amount</Label>
                          <div className="mt-1 h-10 px-3 bg-muted rounded-md flex items-center font-semibold text-primary">
                            ${item.amount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Button onClick={addLineItem} className="w-full" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Service
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-lg border-0" style={{ background: 'var(--gradient-card)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Quick Add
              </CardTitle>
              <CardDescription>
                Common services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {predefinedServices.map((service) => (
                <Button
                  key={service.description}
                  variant="ghost"
                  size="sm"
                  onClick={() => addPredefinedService(service)}
                  className="w-full justify-between h-auto p-3 text-left"
                >
                  <div>
                    <div className="font-medium text-sm">{service.description}</div>
                    <div className="text-xs text-muted-foreground">${service.rate}</div>
                  </div>
                  <Plus className="w-4 h-4" />
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0" style={{ background: 'var(--gradient-card)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Totals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tax Rate (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={taxRate * 100}
                  onChange={(e) => onTaxRateChange(parseFloat(e.target.value) / 100 || 0)}
                  className="h-10 border-0 bg-white shadow-sm"
                />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax ({(taxRate * 100).toFixed(1)}%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-primary">Total:</span>
                  <span className="font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};