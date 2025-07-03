import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import {
  Building,
  DollarSign,
  Wrench,
  TrendingUp,
  Bell,
  Settings,
  User,
  AlertTriangle,
  Eye
} from "lucide-react";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProperty, setSelectedProperty] = useState(0);
  const [hoveredUnit, setHoveredUnit] = useState<number | null>(null);
  const { notifications } = useNotifications();
  const { token } = useAuth();

  const [properties, setProperties] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;
    fetch("/api/owner/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setProperties(data.properties || []);
        setUnits(data.units || []);
        setMaintenanceRequests(data.maintenance || []);
      })
      .catch(() => {});
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Overdue": return "bg-red-100 text-red-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Vacant": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600";
      case "Medium": return "text-orange-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-green-600 animate-pulse" />
            <span className="text-xl font-semibold">AptCircle</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 animate-fade-in">Owner</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-600 transition-colors" />
              {notifications.some((n) => !n.read) && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              )}
            </div>
            <User className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-600 transition-colors" />
            <Settings className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-600 transition-colors" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in">
            Property Portfolio 🏢
          </h1>
          <p className="text-gray-600 animate-fade-in">
            Manage your properties and track performance
          </p>
        </div>

        {/* Property Selector */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {properties.map((property, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                selectedProperty === index ? 'ring-2 ring-green-500 bg-gradient-to-br from-white to-green-50' : ''
              }`}
              onClick={() => setSelectedProperty(index)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{property.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Occupancy:</span>
                    <span className="font-medium">{property.occupied}/{property.units}</span>
                  </div>
                  <Progress value={(property.occupied / property.units) * 100} className="h-2" />
                  <div className="flex justify-between">
                    <span>Monthly Revenue:</span>
                    <span className="font-medium text-green-600">${property.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="units">Units</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
          </TabsList>

          {/* Add your tab contents here as per your existing file (omitted for brevity, no conflict here) */}

        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;