export default function Breadcrumb() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="py-3" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li><a href="#" className="text-gray-500 hover:text-gray-700">Location</a></li>
            <li><i className="fas fa-chevron-right text-gray-400 text-xs"></i></li>
            <li><a href="#" className="text-gray-500 hover:text-gray-700">Service Type</a></li>
            <li><i className="fas fa-chevron-right text-gray-400 text-xs"></i></li>
            <li><span className="text-primary font-medium">Choose Skip Size</span></li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
