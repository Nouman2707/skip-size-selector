export default function Footer() {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Skip Hire", href: "#" },
        { name: "Garden Waste", href: "#" },
        { name: "Construction Waste", href: "#" },
        { name: "Commercial Services", href: "#" }
      ]
    },
    {
      title: "Support", 
      links: [
        { name: "Contact Us", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Terms & Conditions", href: "#" },
        { name: "Privacy Policy", href: "#" }
      ]
    }
  ];

  const contactInfo = [
    { icon: "fas fa-phone", text: "0800 123 4567" },
    { icon: "fas fa-envelope", text: "hello@wewantwaste.co.uk" },
    { icon: "fas fa-clock", text: "Mon-Fri 8AM-6PM" }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-recycle text-white"></i>
              </div>
              <span className="text-xl font-bold">WeWantWaste</span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional waste management solutions for homes and businesses across the UK.
            </p>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center">
                  <i className={`${info.icon} mr-2`}></i>
                  <span>{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 WeWantWaste. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
