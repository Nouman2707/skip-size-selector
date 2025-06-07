import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { SkipApiResponse } from "@shared/schema";

interface SkipCardProps {
  skip: SkipApiResponse;
  isSelected: boolean;
  onSelect: () => void;
}

export default function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  const { toast } = useToast();
  const getSkipIcon = (size: number) => {
    if (size <= 4) return "fas fa-cube";
    if (size <= 6) return "fas fa-cubes";
    if (size <= 8) return "fas fa-layer-group";
    return "fas fa-shipping-fast";
  };

  const getIconColor = (size: number) => {
    return size >= 8 ? "text-secondary" : "text-primary";
  };

  const getBackgroundColor = (size: number) => {
    return size >= 8 ? "bg-green-100" : "bg-blue-100";
  };

  const getUseCases = (size: number) => {
    if (size <= 4) {
      return ["Small garden clearances", "Hedge trimmings", "Lawn clippings"];
    } else if (size <= 6) {
      return ["Medium garden projects", "Tree pruning waste", "Shed clearouts"];
    } else if (size <= 8) {
      return ["Large garden overhauls", "Commercial landscaping", "Multiple property cleanup"];
    } else {
      return ["Major landscaping projects", "Construction green waste", "Commercial garden clearance"];
    }
  };

  const getSkipName = (size: number) => {
    if (size <= 4) return "Mini Skip";
    if (size <= 6) return "Midi Skip";
    if (size <= 8) return "Builder's Skip";
    return "Large Skip";
  };

  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);

  const handleCardClick = () => {
    const skipName = getSkipName(skip.size);
    if (!isSelected) {
      toast({
        title: "Skip Selected",
        description: `${skipName} (${skip.size} cubic yards) - £${totalPrice.toFixed(2)} inc. VAT`,
      });
    } else {
      toast({
        title: "Skip Already Selected",
        description: `${skipName} is currently your chosen option`,
      });
    }
    onSelect();
  };

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 overflow-hidden group hover:shadow-lg ${
        isSelected
          ? "ring-2 ring-primary bg-blue-50 border-primary"
          : skip.size === 6
          ? "border-2 border-primary"
          : "border border-gray-200"
      }`}
      onClick={handleCardClick}
    >
      {/* Responsive image */}
      <img
        src="https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg"
        alt={`${getSkipName(skip.size)} Image`}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
      />

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${getBackgroundColor(skip.size)} rounded-lg flex items-center justify-center`}>
              <i className={`${getSkipIcon(skip.size)} ${getIconColor(skip.size)} text-xl`}></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{getSkipName(skip.size)}</h3>
              <p className="text-sm text-gray-500">{skip.size} cubic yards</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">£{totalPrice.toFixed(2)}</div>
            <div className="text-sm text-gray-500">inc. VAT</div>
          </div>
        </div>

        <div className={`${skip.size === 6 ? "bg-blue-50" : "bg-gray-50"} rounded-lg p-4 mb-4`}>
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
            <i className="fas fa-calendar-alt mr-1"></i>
            {skip.hire_period_days} day hire
          </span>
          <span className="flex items-center">
            <i className="fas fa-road mr-1"></i>
            {skip.allowed_on_road ? "Road permit included" : "Private land only"}
          </span>
        </div>

        <Button
          className={`w-full font-medium transition-all duration-200 ${
            isSelected
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white group-hover:bg-primary group-hover:text-white"
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
