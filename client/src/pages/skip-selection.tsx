import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import SkipCard from "@/components/skip-card";
import ServiceInfo from "@/components/service-info";
import Footer from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import type { SkipApiResponse } from "@shared/schema";

export default function SkipSelection() {
  const [selectedSkip, setSelectedSkip] = useState<SkipApiResponse | null>(null);
  const { toast } = useToast();

  const { data: skips, isLoading, error, refetch } = useQuery<SkipApiResponse[]>({
    queryKey: ['/api/skips'],
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSkipSelect = (skip: SkipApiResponse) => {
    setSelectedSkip(skip);
    const skipName = skip.size <= 4 ? 'Mini Skip' : skip.size <= 6 ? 'Midi Skip' : skip.size <= 8 ? 'Builder\'s Skip' : 'Large Skip';
    toast({
      title: "Skip Selected",
      description: `${skipName} (${skip.size} cubic yards) has been selected for your garden waste disposal.`,
    });
  };

  const handleProceedToBooking = () => {
    if (selectedSkip) {
      // Store selection in sessionStorage for next page
      sessionStorage.setItem('selectedSkip', JSON.stringify(selectedSkip));
      
      const skipName = selectedSkip.size <= 4 ? 'Mini Skip' : selectedSkip.size <= 6 ? 'Midi Skip' : selectedSkip.size <= 8 ? 'Builder\'s Skip' : 'Large Skip';
      const totalPrice = (selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2);
      
      toast({
        title: "Proceeding to Booking",
        description: `Continuing with ${skipName} - £${totalPrice}`,
      });
      
      // In a real app, this would navigate to the booking page
      // For demo purposes, we'll show an alert
      setTimeout(() => {
        alert(`Proceeding with ${skipName} - £${totalPrice}\n\nIn a real application, this would navigate to the booking details page.`);
      }, 1000);
    }
  };

  const handleRetry = () => {
    refetch();
  };

  const handleCustomQuote = () => {
    toast({
      title: "Custom Quote Request",
      description: "Redirecting to custom quote form...",
    });
    // In a real app, this would navigate to a custom quote page
    setTimeout(() => {
      alert("In a real application, this would open a custom quote request form.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <Breadcrumb />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Skip Size
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Select the perfect skip size for your garden waste disposal needs. 
              All prices include delivery, collection, and disposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                <span>LE10 1SH, Leicestershire</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-leaf text-secondary mr-2"></i>
                <span>Garden Waste</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Unable to load skip options. Please check your connection and try again.</span>
              <Button variant="outline" size="sm" onClick={handleRetry} className="ml-4">
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Skip Options */}
        {!isLoading && !error && skips && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {skips.map((skip) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  isSelected={selectedSkip?.id === skip.id}
                  onSelect={() => handleSkipSelect(skip)}
                />
              ))}
              
              {/* Custom Quote Option */}
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-pointer group" onClick={handleCustomQuote}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-question text-gray-500 text-2xl"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Need Something Different?</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Can't find the right size? We offer custom solutions for unique requirements.
                  </p>
                  <Button variant="secondary" className="bg-gray-800 text-white hover:bg-gray-900">
                    <i className="fas fa-envelope mr-2"></i>
                    Get Custom Quote
                  </Button>
                </CardContent>
              </Card>
            </div>

            <ServiceInfo />

            {/* Selection Summary */}
            {selectedSkip && (
              <Card className="mb-8 border-primary shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-secondary text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedSkip.size <= 4 ? 'Mini Skip' : selectedSkip.size <= 6 ? 'Midi Skip' : selectedSkip.size <= 8 ? 'Builder\'s Skip' : 'Large Skip'} Selected</h3>
                        <p className="text-sm text-gray-600">{selectedSkip.size} cubic yards • {selectedSkip.hire_period_days} day hire</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">£{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2)}</div>
                      <div className="text-sm text-gray-500">inc. VAT & delivery</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Continue Button */}
            <div className="text-center">
              <Button
                onClick={handleProceedToBooking}
                disabled={!selectedSkip}
                size="lg"
                className="bg-primary text-white px-8 py-4 text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <i className="fas fa-arrow-right mr-2"></i>
                Continue to Booking Details
              </Button>
              <p className="text-sm text-gray-500 mt-3">You can review and modify your selection on the next page</p>
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && skips && skips.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-box-open text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Skip Options Available</h3>
            <p className="text-gray-600 mb-4">
              We don't have any skip options available for your area at the moment.
            </p>
            <Button onClick={handleCustomQuote} variant="outline">
              Request Custom Quote
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
