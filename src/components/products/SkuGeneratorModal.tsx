
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SkuGeneratorModalProps {
  onGenerate: (category: string, productName: string, isMasked: boolean) => void;
  onClose: () => void;
}

const SkuGeneratorModal = ({ onGenerate, onClose }: SkuGeneratorModalProps) => {
  const [skuInfo, setSkuInfo] = useState({
    category: '',
    productName: '',
    isMasked: false
  });

  const handleSubmit = () => {
    onGenerate(skuInfo.category, skuInfo.productName, skuInfo.isMasked);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-elevated max-w-md w-full animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Generate FNSKU</h3>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={skuInfo.productName}
                onChange={(e) => setSkuInfo({...skuInfo, productName: e.target.value})}
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={skuInfo.category}
                onChange={(e) => setSkuInfo({...skuInfo, category: e.target.value})}
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isMasked"
                checked={skuInfo.isMasked}
                onChange={(e) => setSkuInfo({...skuInfo, isMasked: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="isMasked" className="text-sm">Generate Masked FNSKU for Amazon</label>
            </div>
            
            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!skuInfo.productName || !skuInfo.category}
              >
                Generate FNSKU
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkuGeneratorModal;
