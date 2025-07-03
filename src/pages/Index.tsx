import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Settings, 
  Calendar, 
  User,
  Building,
  Wrench,
  DollarSign,
  MessageSquare,
  Shield,
  Smartphone,
  ArrowRight,
  Star
} from "lucide-react";

const Index = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const features = [
    {
      icon: DollarSign,
      title: "Rent Management",
      description: "Automated reminders, digital payments, and receipt generation",
      stats: "98% payment success rate"
    },
    {
      icon: Wrench,
      title: "Maintenance Ticketing",
      description: "Submit, track, and manage maintenance requests with photo uploads",
      stats: "24hr average response time"
    },
    {
      icon: Calendar,
      title: "Utility Management",
      description: "Track usage, split bills, and coordinate payments",
      stats: "30% cost savings on average"
    },
    {
      icon: MessageSquare,
      title: "Community Hub",
      description: "Announcements, discussions, and neighbor networking",
      stats: "85% user engagement"
    },
    {
      icon: Building,
      title: "Property Oversight",
      description: "Monitor occupancy, track performance, and manage listings",
      stats: "15% higher occupancy rates"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Role-based access control and data protection",
      stats: "Bank-level security"
    }
  ];

  const userTypes = [
    {
      type: "tenant",
      title: "Tenant",
      description: "Manage rent, maintenance requests, and connect with neighbors",
      icon: User,
      color: "bg-blue-500",
      benefits: ["Easy rent payments", "Quick maintenance requests", "Community features"]
    },
    {
      type: "owner",
      title: "Owner/Landlord", 
      description: "Monitor properties, track income, and manage tenants",
      icon: Building,
      color: "bg-green-500",
      benefits: ["Income analytics", "Tenant management", "Property insights"]
    },
    {
      type: "admin",
      title: "Admin/Manager",
      description: "Full platform control, vendor coordination, and analytics",
      icon: Settings,
      color: "bg-purple-500",
      benefits: ["Complete oversight", "Vendor management", "Advanced analytics"]
    },
    {
      type: "vendor",
      title: "Service Provider",
      description: "Receive job assignments and manage service requests",
      icon: Wrench,
      color: "bg-orange-500",
      benefits: ["Job assignments", "Schedule management", "Payment tracking"]
    }
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Tenant", rating: 5, text: "AptCircle has made managing my apartment life so much easier!" },
    { name: "Mike Chen", role: "Property Owner", rating: 5, text: "Fantastic platform for managing multiple properties efficiently." },
    { name: "Lisa Rodriguez", role: "Building Manager", rating: 5, text: "The analytics and reporting features are incredibly detailed." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="relative">
              <Building className="h-8 w-8 text-blue-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
              AptCircle
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="hover:scale-105 transition-transform" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="hover:scale-105 transition-transform bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button variant="outline" className="hover:scale-105 transition-transform" asChild>
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Community-Centric Apartment Management
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            Streamline rent collection, maintenance requests, and community engagement 
            for small to mid-sized apartment buildings.
          </p>
          <div className="flex justify-center items-center space-x-4 mb-8 animate-fade-in">
            <Badge variant="secondary" className="text-lg px-4 py-2 hover:scale-110 transition-transform cursor-pointer">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile & Web
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2 hover:scale-110 transition-transform cursor-pointer">
              <Users className="w-4 h-4 mr-2" />
              Multi-Role Platform
            </Badge>
          </div>
        </div>
      </section>

      {/* User Role Selection */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12 animate-fade-in">
          Choose Your Role
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userTypes.map((user, index) => (
            <Card 
              key={user.type}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                userRole === user.type ? 'ring-2 ring-blue-500 scale-105' : ''
              } ${selectedUser === index ? 'bg-gradient-to-br from-white to-blue-50' : 'bg-white'}`}
              onClick={() => {
                setUserRole(user.type);
                setSelectedUser(index);
              }}
              onMouseEnter={() => setSelectedUser(index)}
              onMouseLeave={() => setSelectedUser(null)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${user.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-transform ${
                  selectedUser === index ? 'scale-110 rotate-12' : ''
                }`}>
                  <user.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{user.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  {user.description}
                </CardDescription>
                {selectedUser === index && (
                  <div className="space-y-2 animate-fade-in">
                    {user.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-sm text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {userRole && (
          <div className="text-center mt-8 animate-fade-in">
            <Button 
              size="lg" 
              onClick={() => window.location.href = `/${userRole}`}
              className="hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Continue as {userTypes.find(u => u.type === userRole)?.title}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Core Features
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer ${
                hoveredFeature === index ? 'scale-105 bg-gradient-to-br from-white to-blue-50' : 'hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardHeader>
                <div className={`transition-all duration-300 ${hoveredFeature === index ? 'animate-pulse' : ''}`}>
                  <feature.icon className={`w-10 h-10 mb-4 transition-colors ${
                    hoveredFeature === index ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">{feature.description}</CardDescription>
                {hoveredFeature === index && (
                  <Badge variant="secondary" className="animate-fade-in bg-green-100 text-green-800">
                    {feature.stats}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building className="h-6 w-6 animate-pulse" />
            <span className="text-xl font-semibold">AptCircle</span>
          </div>
          <p className="text-gray-300">
            Simplifying apartment management for modern communities
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;