import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Plus, Trash2, Calculator, Edit, RotateCcw, FolderPlus } from "lucide-react";
import { LineItem, Section } from "@/types/estimate";
import { usePredefinedServices, PredefinedService } from "@/hooks/usePredefinedServices";
import { useState } from "react";

interface LineItemsStepProps {
  data: Section[];
  taxRate: number;
  onChange: (data: Section[]) => void;
  onTaxRateChange: (rate: number) => void;
}

export const LineItemsStep = ({ data, taxRate, onChange, onTaxRateChange }: LineItemsStepProps) => {
  const { services, addService, updateService, deleteService, resetToDefaults } = usePredefinedServices();
  const [editingService, setEditingService] = useState<PredefinedService | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({ description: '', rate: 0 });

  const addSection = () => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: `Section ${data.length + 1}`,
      lineItems: [],
    };
    onChange([...data, newSection]);
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    const updatedSections = data.map(section => 
      section.id === sectionId ? { ...section, title } : section
    );
    onChange(updatedSections);
  };

  const removeSection = (sectionId: string) => {
    onChange(data.filter(section => section.id !== sectionId));
  };

  const addLineItemToSection = (sectionId: string) => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    const updatedSections = data.map(section => 
      section.id === sectionId 
        ? { ...section, lineItems: [...section.lineItems, newItem] }
        : section
    );
    onChange(updatedSections);
  };

  const updateLineItem = (sectionId: string, itemId: string, field: keyof LineItem, value: string | number) => {
    const updatedSections = data.map(section => {
      if (section.id === sectionId) {
        const updatedLineItems = section.lineItems.map(item => {
          if (item.id === itemId) {
            const updated = { ...item, [field]: value };
            if (field === 'quantity' || field === 'rate') {
              updated.amount = Number(updated.quantity) * Number(updated.rate);
            }
            return updated;
          }
          return item;
        });
        return { ...section, lineItems: updatedLineItems };
      }
      return section;
    });
    onChange(updatedSections);
  };

  const removeLineItem = (sectionId: string, itemId: string) => {
    const updatedSections = data.map(section => 
      section.id === sectionId 
        ? { ...section, lineItems: section.lineItems.filter(item => item.id !== itemId) }
        : section
    );
    onChange(updatedSections);
  };

  const allLineItems = data.flatMap(section => section.lineItems);
  const subtotal = allLineItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const addPredefinedServiceToSection = (sectionId: string, service: PredefinedService) => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: service.description,
      quantity: 1,
      rate: service.rate,
      amount: service.rate,
    };
    const updatedSections = data.map(section => 
      section.id === sectionId 
        ? { ...section, lineItems: [...section.lineItems, newItem] }
        : section
    );
    onChange(updatedSections);
  };

  const handleEditService = (service: PredefinedService) => {
    setEditingService(service);
  };

  const handleSaveEdit = () => {
    if (editingService) {
      updateService(editingService.id, {
        description: editingService.description,
        rate: editingService.rate,
      });
      setEditingService(null);
    }
  };

  const handleAddNewService = () => {
    if (newServiceForm.description && newServiceForm.rate > 0) {
      addService(newServiceForm);
      setNewServiceForm({ description: '', rate: 0 });
      setIsAddingNew(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2 animate-in fade-in duration-500 delay-150">
        <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-full flex items-center justify-center mx-auto shadow-xl animate-in zoom-in duration-500 delay-300">
          <ShoppingCart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-in slide-in-from-bottom-2 duration-500 delay-200">
          Services & Pricing
        </h2>
        <p className="text-muted-foreground text-lg animate-in slide-in-from-bottom-2 duration-500 delay-250">
          Add the services you'll be providing
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6 animate-in fade-in duration-500 delay-400">
        <div className="xl:col-span-3 space-y-4">
          {/* Sections */}
          {data.length === 0 ? (
            <Card className="shadow-xl border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl" style={{ background: 'var(--gradient-card)' }}>
              <CardContent className="py-16 text-center animate-in fade-in duration-500">
                <FolderPlus className="w-16 h-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
                <p className="text-lg text-muted-foreground mb-4">No sections added yet</p>
                <p className="text-sm text-muted-foreground">Click "Add Section" to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {data.map((section, sectionIndex) => (
                <Card key={section.id} className="shadow-xl border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl animate-in slide-in-from-left-3 duration-300" style={{ background: 'var(--gradient-card)', animationDelay: `${sectionIndex * 100}ms` }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Section {sectionIndex + 1}
                        </Badge>
                        <Input
                          value={section.title}
                          onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                          className="h-8 font-semibold border-0 bg-transparent focus:bg-white/50 px-2"
                          placeholder="Section title"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSection(section.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.lineItems.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground bg-white/30 rounded-lg border border-dashed border-primary/20">
                        <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No services in this section yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {section.lineItems.map((item, itemIndex) => (
                          <div key={item.id} className="bg-white/60 p-4 rounded-lg border border-primary/10 transition-all duration-300 hover:bg-white/80 hover:shadow-md animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${itemIndex * 50}ms` }}>
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline" className="bg-background/50">
                                Item #{itemIndex + 1}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLineItem(section.id, item.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-105"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
                              <div className="sm:col-span-2 lg:col-span-6">
                                <Label className="text-sm font-medium">Description</Label>
                                <Input
                                  placeholder="Service description"
                                  value={item.description}
                                  onChange={(e) => updateLineItem(section.id, item.id, 'description', e.target.value)}
                                  className="mt-1 h-10 border-0 bg-white shadow-sm"
                                />
                              </div>
                              <div className="lg:col-span-2">
                                <Label className="text-sm font-medium">Qty</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => updateLineItem(section.id, item.id, 'quantity', parseInt(e.target.value) || 1)}
                                  className="mt-1 h-10 border-0 bg-white shadow-sm"
                                />
                              </div>
                              <div className="lg:col-span-2">
                                <Label className="text-sm font-medium">Rate</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={item.rate}
                                  onChange={(e) => updateLineItem(section.id, item.id, 'rate', parseFloat(e.target.value) || 0)}
                                  className="mt-1 h-10 border-0 bg-white shadow-sm"
                                />
                              </div>
                              <div className="lg:col-span-2">
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
                    
                    <Button 
                      onClick={() => addLineItemToSection(section.id)} 
                      variant="outline" 
                      className="w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service to Section
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <Button onClick={addSection} className="w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]" variant="outline">
            <FolderPlus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div>

        <div className="xl:col-span-1 space-y-4">
          <Card className="shadow-xl border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl" style={{ background: 'var(--gradient-card)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Plus className="w-4 h-4 text-primary" />
                Quick Add Services
                <div className="ml-auto flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingNew(true)}
                    className="text-primary hover:bg-primary/10 transition-all duration-200 h-6 w-6 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetToDefaults}
                    className="text-muted-foreground hover:bg-muted/50 transition-all duration-200 h-6 w-6 p-0"
                    title="Reset to defaults"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="text-xs">
                Manage and add common services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-64 overflow-y-auto">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="space-y-2 p-2 rounded-lg bg-white/40 hover:bg-white/60 transition-all duration-200 animate-in slide-in-from-right-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs truncate">{service.description}</div>
                      <div className="text-xs text-muted-foreground">${service.rate}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditService(service)}
                        className="h-6 w-6 p-0 text-primary hover:bg-primary/10 transition-all duration-200"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteService(service.id)}
                        className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10 transition-all duration-200"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  {data.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {data.map((section) => (
                        <Button
                          key={section.id}
                          variant="ghost"
                          size="sm"
                          onClick={() => addPredefinedServiceToSection(section.id, service)}
                          className="h-6 px-2 text-xs text-primary hover:bg-primary/10 transition-all duration-200"
                        >
                          + {section.title}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl" style={{ background: 'var(--gradient-card)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calculator className="w-4 h-4 text-primary" />
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
                  className="h-8 border-0 bg-white shadow-sm transition-all duration-200 focus:shadow-md text-sm"
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm animate-in fade-in duration-300">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm animate-in fade-in duration-300 delay-100">
                  <span className="text-muted-foreground">Tax ({(taxRate * 100).toFixed(1)}%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between animate-in fade-in duration-300 delay-200">
                  <span className="font-bold text-primary">Total:</span>
                  <span className="font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Service Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Modify the service details below.
            </DialogDescription>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4">
              <div>
                <Label>Description</Label>
                <Input
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Service description"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Rate ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingService.rate}
                  onChange={(e) => setEditingService({ ...editingService, rate: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingService(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Service Dialog */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new predefined service for quick access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Description</Label>
              <Input
                value={newServiceForm.description}
                onChange={(e) => setNewServiceForm({ ...newServiceForm, description: e.target.value })}
                placeholder="Service description"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Rate ($)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={newServiceForm.rate}
                onChange={(e) => setNewServiceForm({ ...newServiceForm, rate: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNewService} disabled={!newServiceForm.description || newServiceForm.rate <= 0}>
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};