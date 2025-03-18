
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { generateFNSKU } from '@/utils/skuGenerator';
import { toast } from 'sonner';
import { Product } from '@/utils/types';

interface MaskProductModalProps {
  product: Product;
  onMask: (productId: string, amazonFnsku: string) => Promise<void>;
  onClose: () => void;
}

const MaskProductModal = ({ product, onMask, onClose }: MaskProductModalProps) => {
  const [amazonFnsku, setAmazonFnsku] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateFnsku = () => {
    setIsGenerating(true);
    // Use the existing generator function
    const generatedFnsku = generateFNSKU(product.category, product.name, true);
    setAmazonFnsku(generatedFnsku);
    setIsGenerating(false);
  };

  const handleSubmit = async () => {
    if (!amazonFnsku.trim()) {
      toast.error('Please enter an Amazon FNSKU');
      return;
    }

    setIsSubmitting(true);
    try {
      await onMask(product.id, amazonFnsku);
      toast.success('Product masked successfully');
      onClose();
    } catch (error) {
      console.error('Error masking product:', error);
      toast.error('Failed to mask product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-elevated max-w-md w-full animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Create Masked Product</h3>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="productName">Product</Label>
              <Input 
                id="productName" 
                value={product.name} 
                disabled 
                className="bg-muted/50"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="amazonFnsku">Amazon FNSKU</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGenerateFnsku}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Auto-generate'}
                </Button>
              </div>
              <Input 
                id="amazonFnsku" 
                value={amazonFnsku} 
                onChange={(e) => setAmazonFnsku(e.target.value)}
                placeholder="Enter Amazon FNSKU"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This FNSKU will be used to track this product on Amazon
              </p>
            </div>
            
            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!amazonFnsku.trim() || isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Masked Product'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaskProductModal;
