import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";
import { PaymentInfo } from "@/types/estimate";

interface PaymentInfoSettingsProps {
  paymentData: PaymentInfo;
  onSave: (data: PaymentInfo) => void;
}

export const PaymentInfoSettings = ({ paymentData, onSave }: PaymentInfoSettingsProps) => {
  const [data, setData] = useState<PaymentInfo>(paymentData);
  const [open, setOpen] = useState(false);

  const paymentMethods = [
    'Bank Transfer',
    'Check',
    'Cash',
    'PayPal',
    'Venmo',
    'Credit Card',
    'Wire Transfer'
  ];

  const handleSave = () => {
    localStorage.setItem('payment-info', JSON.stringify(data));
    onSave(data);
    setOpen(false);
  };

  const updateField = (field: keyof PaymentInfo, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleMethodChange = (method: string, checked: boolean) => {
    if (checked) {
      updateField('acceptedMethods', [...data.acceptedMethods, method]);
    } else {
      updateField('acceptedMethods', data.acceptedMethods.filter(m => m !== method));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CreditCard className="w-4 h-4" />
          Payment Info
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Payment Information</DialogTitle>
          <DialogDescription>
            Configure payment methods and banking details for your estimates
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold">Accepted Payment Methods</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {paymentMethods.map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <Checkbox
                    id={method}
                    checked={data.acceptedMethods.includes(method)}
                    onCheckedChange={(checked) => handleMethodChange(method, checked as boolean)}
                  />
                  <Label htmlFor={method} className="text-sm font-normal">
                    {method}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={data.bankName}
                onChange={(e) => updateField('bankName', e.target.value)}
                placeholder="Bank of America"
              />
            </div>
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                value={data.accountName}
                onChange={(e) => updateField('accountName', e.target.value)}
                placeholder="ConstructTeam INC"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={data.accountNumber}
                onChange={(e) => updateField('accountNumber', e.target.value)}
                placeholder="****1234"
              />
            </div>
            <div>
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                value={data.routingNumber}
                onChange={(e) => updateField('routingNumber', e.target.value)}
                placeholder="123456789"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paypalEmail">PayPal Email</Label>
              <Input
                id="paypalEmail"
                value={data.paypalEmail}
                onChange={(e) => updateField('paypalEmail', e.target.value)}
                placeholder="payments@constructteam.com"
              />
            </div>
            <div>
              <Label htmlFor="venmoUsername">Venmo Username</Label>
              <Input
                id="venmoUsername"
                value={data.venmoUsername}
                onChange={(e) => updateField('venmoUsername', e.target.value)}
                placeholder="@constructteam"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Payment Notes</Label>
            <Textarea
              id="notes"
              value={data.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Additional payment instructions or notes..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Payment Info
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};