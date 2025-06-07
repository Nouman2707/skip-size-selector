import { Card, CardContent } from "@/components/ui/card";

export default function ServiceInfo() {
  const services = [
    {
      icon: "fas fa-truck",
      title: "Free Delivery",
      description: "Skip delivered to your location at no extra cost",
      color: "bg-primary"
    },
    {
      icon: "fas fa-calendar-check", 
      title: "Flexible Collection",
      description: "Keep for up to 2 weeks, extend if needed",
      color: "bg-secondary"
    },
    {
      icon: "fas fa-recycle",
      title: "Eco Disposal", 
      description: "95% of garden waste recycled responsibly",
      color: "bg-accent"
    }
  ];

  return (
    <Card className="bg-blue-50 mb-8">
      <CardContent className="p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">What's Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <i className={`${service.icon} text-white`}></i>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">{service.title}</h4>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
