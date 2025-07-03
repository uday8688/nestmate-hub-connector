
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wrench, 
  Calendar, 
  DollarSign,
  Clock,
  MapPin,
  Star,
  Bell,
  User,
  Settings,
  Building,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const ServiceProviderDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold">AptCircle</span>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">Service Provider</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-gray-600" />
            <User className="h-5 w-5 text-gray-600" />
            <Settings className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, ABC Plumbing!</h1>
          <p className="text-gray-600">Manage your service requests and schedule</p>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-blue-100 text-sm">3 due today</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,250</div>
              <p className="text-green-100 text-sm">earnings</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-orange-100 text-sm">out of 5 stars</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <p className="text-purple-100 text-sm">on-time delivery</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Kitchen faucet repair</p>
                        <p className="text-sm text-gray-600">Unit 4B • 9:00 AM - 11:00 AM</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          Sunset Apartments
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="text-xs">Start Job</Button>
                      <Button size="sm" variant="outline" className="text-xs">Details</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">HVAC maintenance</p>
                        <p className="text-sm text-gray-600">Unit 2A • 2:00 PM - 4:00 PM</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          Green Valley Complex
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="w-5 h-5 mr-2" />
                  Active Service Requests
                </CardTitle>
                <CardDescription>Manage your ongoing work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">Emergency: Water leak</p>
                        <p className="text-sm text-gray-600">Unit 3C • Priority: Urgent</p>
                        <p className="text-xs text-gray-500">Assigned 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="text-xs bg-red-600 hover:bg-red-700">Accept</Button>
                      <Button size="sm" variant="outline" className="text-xs">View</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Toilet repair</p>
                        <p className="text-sm text-gray-600">Unit 1D • Priority: Normal</p>
                        <p className="text-xs text-gray-500">Due by tomorrow</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-orange-600 border-orange-200">In Progress</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Garbage disposal fix</p>
                        <p className="text-sm text-gray-600">Unit 2B • Priority: Low</p>
                        <p className="text-xs text-gray-500">Completed - awaiting review</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Earnings Overview
                </CardTitle>
                <CardDescription>Your payment and earnings summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">January Earnings</span>
                      <span className="text-sm text-gray-600">$4,250 / $5,000 target</span>
                    </div>
                    <Progress value={85} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">$3,200</div>
                      <p className="text-xs text-gray-600">Paid</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orange-600">$1,050</div>
                      <p className="text-xs text-gray-600">Pending</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">23</div>
                      <p className="text-xs text-gray-600">Jobs Completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-medium flex items-center">
                      4.8 <Star className="w-3 h-3 ml-1 text-yellow-500" />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jobs Completed</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">On-Time Rate</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium">2.5 hrs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-2">Unit 2A</span>
                    </div>
                    <p className="text-xs text-gray-700">"Fast and professional service!"</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                        <Star className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-gray-600 ml-2">Unit 1B</span>
                    </div>
                    <p className="text-xs text-gray-700">"Good work, arrived on time."</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Update Availability
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Submit Invoice
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Wrench className="w-4 h-4 mr-2" />
                    Job History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
