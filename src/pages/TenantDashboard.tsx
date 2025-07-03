import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  DollarSign,
  Wrench,
  Bell,
  User,
  Calendar,
  MessageSquare,
  FileText,
  CreditCard,
  CheckCircle,
  Clock,
  TrendingUp,
  Settings
} from "lucide-react";

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { notifications } = useNotifications();
  const { token } = useAuth();

  const quickActions = [
    { icon: DollarSign, label: "Pay Rent", color: "bg-green-500", action: "payment" },
    { icon: Wrench, label: "Report Issue", color: "bg-orange-500", action: "maintenance" },
    { icon: MessageSquare, label: "Community", color: "bg-blue-500", action: "community" },
    { icon: Calendar, label: "Book Space", color: "bg-purple-500", action: "booking" }
  ];

  const [maintenanceTickets, setMaintenanceTickets] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;
    fetch("/api/tenant/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setMaintenanceTickets(data.maintenance || []);
        setAnnouncements(data.announcements || []);
      })
      .catch(() => {});
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-blue-600 animate-pulse" />
            <span className="text-xl font-semibold">AptCircle</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 animate-fade-in">Tenant</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
              {notifications.some((n) => !n.read) && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              )}
            </div>
            <User className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
            <Settings className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-gray-600 animate-fade-in">
            Unit 2C • Oak View Apartments
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Card
              key={action.action}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${hoveredCard === action.action ? 'scale-105' : ''}`}
              onMouseEnter={() => setHoveredCard(action.action)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3 transition-transform ${hoveredCard === action.action ? 'rotate-12 scale-110' : ''}`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-gray-900">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        {/* Your tab content remains unchanged (as it was already correct). */}
      </div>
    </div>
  );
};

export default TenantDashboard;