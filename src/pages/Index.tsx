import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Clock, Users, Package, TrendingUp, CheckCircle, Car, UserCheck, Home, BarChart3, User, Menu, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeNav, setActiveNav] = useState("home");

  const stats = {
    totalVisits: 24,
    completedVisits: 18,
    pendingVisits: 6,
    monthlyTarget: 30
  };

  const recentVisits = [
    {
      id: 1,
      clientName: "Ramesh Construction",
      address: "Banjara Hills, Hyderabad",
      type: "Site Inspection",
      status: "Completed",
      date: "2025-01-02",
      time: "10:30 AM"
    },
    {
      id: 2,
      clientName: "Lakshmi Builders",
      address: "Jubilee Hills, Hyderabad",
      type: "Quote Discussion",
      status: "Pending",
      date: "2025-01-02",
      time: "2:00 PM"
    },
    {
      id: 3,
      clientName: "Srinivas Enterprises",
      address: "Gachibowli, Hyderabad",
      type: "Service Call",
      status: "Completed",
      date: "2025-01-01",
      time: "11:15 AM"
    },
    {
      id: 4,
      clientName: "Vijay Constructions",
      address: "Kondapur, Hyderabad",
      type: "Product Demo",
      status: "Completed",
      date: "2024-12-31",
      time: "3:30 PM"
    },
    {
      id: 5,
      clientName: "Priya Developers",
      address: "Madhapur, Hyderabad",
      type: "Site Inspection",
      status: "Pending",
      date: "2025-01-03",
      time: "9:00 AM"
    }
  ];

  const handleMainOption = (option: string) => {
    if (option === "visits") {
      setCurrentView("visits");
      setActiveNav("visits");
    } else if (option === "attendance") {
      navigate("/attendance");
    } else if (option === "conveyance") {
      navigate("/conveyance");
    } else {
      setCurrentView(option);
      setActiveNav(option);
    }
  };

  const handleVisitDetail = (visitId: number) => {
    navigate(`/visit/${visitId}`);
  };

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => {
            setCurrentView("dashboard");
            setActiveNav("home");
          }}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            activeNav === "home" ? "text-blue-600 bg-blue-50" : "text-gray-500"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button
          onClick={() => handleMainOption("visits")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            activeNav === "visits" ? "text-blue-600 bg-blue-50" : "text-gray-500"
          }`}
        >
          <MapPin className="h-5 w-5" />
          <span className="text-xs mt-1">Visits</span>
        </button>
        
        <button
          onClick={() => handleMainOption("attendance")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            activeNav === "attendance" ? "text-blue-600 bg-blue-50" : "text-gray-500"
          }`}
        >
          <UserCheck className="h-5 w-5" />
          <span className="text-xs mt-1">Attendance</span>
        </button>
        
        <button
          onClick={() => handleMainOption("conveyance")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            activeNav === "conveyance" ? "text-blue-600 bg-blue-50" : "text-gray-500"
          }`}
        >
          <Car className="h-5 w-5" />
          <span className="text-xs mt-1">Conveyance</span>
        </button>
      </div>
    </div>
  );

  if (currentView === "visits") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">My Visits</h1>
              <p className="text-blue-100">Track your field activities</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 rounded-xl">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-blue-500 text-white">VK</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Visits</p>
                  <p className="text-2xl font-bold text-white">{stats.totalVisits}</p>
                </div>
                <div className="bg-white/20 p-2 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{stats.completedVisits}</p>
                </div>
                <div className="bg-white/20 p-2 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border-white/20 rounded-xl h-12">
              <Calendar className="h-4 w-4 mr-2" />
              Today's Visits
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border-white/20 rounded-xl h-12">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Visits List */}
        <div className="p-6 -mt-6">
          <Card className="rounded-3xl border-0 shadow-xl bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Recent Visits - Hyderabad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentVisits.map((visit) => (
                <Card 
                  key={visit.id} 
                  className="hover:shadow-md transition-all cursor-pointer border border-gray-100 rounded-2xl overflow-hidden"
                  onClick={() => handleVisitDetail(visit.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{visit.clientName}</h3>
                          <Badge 
                            variant={visit.status === "Completed" ? "default" : "secondary"}
                            className={visit.status === "Completed" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                          >
                            {visit.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{visit.address}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">{visit.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">{visit.time}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blue-600 mt-2 font-medium">{visit.type}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                        View →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">VEKA Ltd</h1>
              <p className="text-blue-100 text-sm">Field Sales Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 rounded-xl">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-blue-500 text-white">VK</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">This Month</p>
              <p className="text-3xl font-bold text-white">{stats.totalVisits}</p>
              <p className="text-blue-100 text-sm">Total Visits</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm mb-1">Completion Rate</p>
              <p className="text-2xl font-bold text-white">75%</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">3</p>
                <p className="text-blue-100 text-xs">Today</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">{stats.completedVisits}</p>
                <p className="text-blue-100 text-xs">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="p-6 -mt-6 space-y-4">
        <Card 
          className="hover:shadow-lg transition-all cursor-pointer border-0 rounded-3xl bg-white shadow-xl"
          onClick={() => handleMainOption("attendance")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Mark Attendance</h3>
                  <p className="text-gray-500 text-sm">Record your daily presence</p>
                </div>
              </div>
              <div className="text-blue-600">→</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-all cursor-pointer border-0 rounded-3xl bg-white shadow-xl"
          onClick={() => handleMainOption("conveyance")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Car className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Conveyance</h3>
                  <p className="text-gray-500 text-sm">Track travel expenses</p>
                </div>
              </div>
              <div className="text-green-600">→</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-all cursor-pointer border-0 rounded-3xl bg-white shadow-xl"
          onClick={() => handleMainOption("visits")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">My Visits</h3>
                  <p className="text-gray-500 text-sm">View field visit schedule</p>
                </div>
              </div>
              <div className="text-purple-600">→</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
