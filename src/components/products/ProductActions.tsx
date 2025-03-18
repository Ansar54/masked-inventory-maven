
import React from 'react';
import { Plus, Barcode } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductActionsProps {
  onOpenSkuGenerator: () => void;
  onOpenNewProductForm: () => void;
}

const ProductActions = ({ onOpenSkuGenerator, onOpenNewProductForm }: ProductActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onOpenSkuGenerator}
      >
        <Barcode size={16} />
        <span>Generate FNSKU</span>
      </Button>
      <Button 
        className="flex items-center gap-2 whitespace-nowrap"
        onClick={onOpenNewProductForm}
      >
        <Plus size={16} />
        <span>Add New Product</span>
      </Button>
    </div>
  );
};

export default ProductActions;
