import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-recycle text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">WeWantWaste</h1>
              <p className="text-sm text-gray-500">Waste Management Solutions</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-sm text-gray-600">Need help?</span>
            <Button variant="ghost" className="text-primary hover:text-blue-700 text-sm font-medium">
              <i className="fas fa-phone mr-1"></i>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
