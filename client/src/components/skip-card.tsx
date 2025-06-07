import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus } from "lucide-react";
import type { SkipApiResponse } from "@shared/schema";

interface SkipCardProps {
  skip: SkipApiResponse;
  isSelected: boolean;
  onSelect: () => void;
}

export default function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  const getSkipIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('mini') || lowerName.includes('small')) {
      return "fas fa-cube";
    } else if (lowerName.includes('standard') || lowerName.includes('medium')) {
      return "fas fa-cubes";
    } else if (lowerName.includes('large') || lowerName.includes('xl')) {
      return "fas fa-layer-group";
    } else if (lowerName.includes('container') || lowerName.includes('roll')) {
      return "fas fa-shipping-fast";
    }
    return "fas fa-cube";
  };

  const getIconColor = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('container') || lowerName.includes('roll')) {
      return "text-secondary";
    }
    return "text-primary";
  };

  const getBackgroundColor = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('container') || lowerName.includes('roll')) {
      return "bg-green-100";
    }
    return "bg-blue-100";
  };

  const getUseCases = (size: string) => {
    const cubicYards = parseInt(size.replace(/[^0-9]/g, ''));
    
    if (cubicYards <= 3) {
      return ['Small garden clearances', 'Hedge trimmings', 'Lawn clippings'];
    } else if (cubicYards <= 6) {
      return ['Medium garden projects', 'Tree pruning waste', 'Shed clearouts'];
    } else if (cubicYards <= 10) {
      return ['Large garden overhauls', 'Commercial landscaping', 'Multiple property cleanup'];
    } else if (cubicYards <= 15) {
      return ['Major landscaping projects', 'Construction green waste', 'Commercial garden clearance'];
    } else {
      return ['Industrial projects', 'Large commercial sites', 'Major construction waste'];
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 overflow-hidden group hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-primary bg-blue-50 border-primary' 
          : skip.popular 
            ? 'border-2 border-primary' 
            : 'border border-gray-200'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-6">
        {skip.popular && (
          <Badge className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1">
            Most Popular
          </Badge>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${getBackgroundColor(skip.name)} rounded-lg flex items-center justify-center`}>
              <i className={`${getSkipIcon(skip.name)} ${getIconColor(skip.name)} text-xl`}></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{skip.name}</h3>
              <p className="text-sm text-gray-500">{skip.size}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">£{skip.price}</div>
            <div className="text-sm text-gray-500">inc. VAT</div>
          </div>
        </div>
        
        <div className={`${skip.popular ? 'bg-blue-50' : 'bg-gray-50'} rounded-lg p-4 mb-4`}>
          <div className="text-sm text-gray-600 mb-2">Perfect for:</div>
          <ul className="text-sm text-gray-700 space-y-1">
            {getUseCases(skip.size).map((useCase, index) => (
              <li key={index} className="flex items-center">
                <Check className="text-secondary text-xs mr-2 h-3 w-3" />
                {useCase}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <i className="fas fa-ruler-combined mr-1"></i>
            {skip.dimensions || 'Standard size'}
          </span>
          <span className="flex items-center">
            <i className="fas fa-weight-hanging mr-1"></i>
            {skip.weight_limit || 'Standard weight'}
          </span>
        </div>

        <Button 
          className={`w-full font-medium transition-all duration-200 ${
            isSelected
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white group-hover:bg-primary group-hover:text-white'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Selected
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Select This Skip
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
