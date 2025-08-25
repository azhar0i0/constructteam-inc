import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { TermsConditions } from "@/types/estimate";

interface TermsConditionsSettingsProps {
  termsData: TermsConditions;
  onSave: (data: TermsConditions) => void;
}

export const TermsConditionsSettings = ({ termsData, onSave }: TermsConditionsSettingsProps) => {
  const [data, setData] = useState<TermsConditions>(termsData);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    localStorage.setItem('terms-conditions', JSON.stringify(data));
    onSave(data);
    setOpen(false);
  };

  const updateField = (field: keyof TermsConditions, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] w-full sm:w-auto">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Terms & Conditions</span>
          <span className="sm:hidden">Terms</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms & Conditions</DialogTitle>
          <DialogDescription>
            Customize the terms and conditions for your estimates
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="validityPeriod">Estimate Validity</Label>
              <Input
                id="validityPeriod"
                value={data.validityPeriod}
                onChange={(e) => updateField('validityPeriod', e.target.value)}
                placeholder="30 days"
              />
            </div>
            <div>
              <Label htmlFor="depositRequired">Deposit Required</Label>
              <Input
                id="depositRequired"
                value={data.depositRequired}
                onChange={(e) => updateField('depositRequired', e.target.value)}
                placeholder="50%"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <Input
              id="paymentTerms"
              value={data.paymentTerms}
              onChange={(e) => updateField('paymentTerms', e.target.value)}
              placeholder="Final payment due upon project completion"
            />
          </div>

          <div>
            <Label htmlFor="additionalCharges">Additional Charges Policy</Label>
            <Input
              id="additionalCharges"
              value={data.additionalCharges}
              onChange={(e) => updateField('additionalCharges', e.target.value)}
              placeholder="Additional changes may incur extra charges"
            />
          </div>

          <div>
            <Label htmlFor="timeline">Project Timeline</Label>
            <Textarea
              id="timeline"
              value={data.timeline}
              onChange={(e) => updateField('timeline', e.target.value)}
              placeholder="Estimated completion time will be discussed upon project acceptance..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={data.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="This estimate includes all specified services. Any additional features or changes..."
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Terms & Conditions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};