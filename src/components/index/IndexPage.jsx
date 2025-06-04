import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Users, Package, TrendingUp, CheckCircle, Star, Phone, Mail, MapPin, Menu, X } from 'lucide-react';

function IndexPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Sales Management",
      description: "Upload and track sales performance with real-time analytics and comprehensive reporting tools."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Employee Management",
      description: "Efficiently manage your team with our integrated employee management system."
    },
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: "Product Management",
      description: "Control inventory and product catalog with advanced management features."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Analytics & Reports",
      description: "Get data-driven insights for business growth with comprehensive analytics dashboard."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Fill Application Form",
      description: "Complete our comprehensive franchise application with your personal and business details."
    },
    {
      number: "02",
      title: "Review & Approval",
      description: "Our team reviews your application and evaluates your franchise potential."
    },
    {
      number: "03",
      title: "Get Dashboard Access",
      description: "Receive your login credentials and access to your personalized franchise dashboard."
    },
    {
      number: "04",
      title: "Start Your Journey",
      description: "Begin managing your franchise with our comprehensive business management tools."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York",
      rating: 5,
      text: "Franchise Flow transformed my business operations. The dashboard system is incredibly intuitive and has helped me increase my revenue by 40% in just 6 months."
    },
    {
      name: "Michael Chen",
      location: "California",
      rating: 5,
      text: "The support team is amazing and the analytics features give me insights I never had before. Best investment I've made for my business growth."
    },
    {
      name: "Emily Rodriguez",
      location: "Texas",
      rating: 5,
      text: "From application to launch, the entire process was smooth. The comprehensive management tools make running my franchise effortless."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FF</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">Franchise Flow</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-900 hover:text-blue-600 font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
              <button className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => navigate("/login")}>Login</button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/apply")}>
                Apply Now
              </button>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-900 hover:text-blue-600 font-medium">Home</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
                <button className="text-left text-gray-700 hover:text-blue-600 font-medium"
                 onClick={() => navigate("/login")} >
                  Login</button>
                <button className="text-left bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-fit"
                 onClick={() => navigate("/apply")}>
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Grow Your Business with Our
                <span className="text-blue-600"> Proven Franchise Model</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join our successful franchise network and get access to comprehensive business management tools, 
                proven strategies, and ongoing support to scale your business effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                onClick={() => navigate("/apply")}>
                  Start Your Franchise Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                onClick={() => navigate("/login")}>
                  Login to Dashboard
                </button>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">Franchise Dashboard</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monthly Sales</span>
                      <span className="text-green-400">↗ $45,230</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Employees</span>
                      <span>24</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Products</span>
                      <span>156</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Real-time business insights at your fingertips</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Franchise Flow?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to build and scale a successful franchise business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Business Model</h3>
              <p className="text-gray-600">95% success rate with over 5 years of proven franchise operations</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Support</h3>
              <p className="text-gray-600">Training, marketing, and operational guidance every step of the way</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Technology</h3>
              <p className="text-gray-600">Cutting-edge dashboard for sales tracking, analytics, and management</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">Scalable business model with expansion and growth potential</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start your franchise journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold text-blue-600 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Franchise Dashboard Features</h2>
            <p className="text-xl text-gray-600">Everything you need to manage your franchise efficiently</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-xl text-gray-300">Hear from our successful franchise partners</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div>
                <div className="text-4xl font-bold text-blue-400">500+</div>
                <div className="text-gray-300">Active Franchises</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400">95%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400">$2.5M</div>
                <div className="text-gray-300">Average Annual Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Franchise Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of successful franchise owners who have transformed their business with Franchise Flow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
             onClick={() => navigate("/apply")}>
              Apply for Franchise
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FF</span>
                </div>
                <span className="text-2xl font-bold">Franchise Flow</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering businesses with comprehensive franchise management solutions and proven growth strategies.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+91 9056413051</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>resham7644@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Bathinda, Punjab 148105</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#services" className="block text-gray-400 hover:text-white transition-colors">Services</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Support</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Franchise Portal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors" onClick={() => navigate("/apply")}>Apply Now</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors" onClick={() => navigate("/login")}>Franchise Login</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors" onClick={() => navigate("/login")}>Admin Portal</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Support Center</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2025 Franchise Flow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default IndexPage;