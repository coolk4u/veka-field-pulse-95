import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Package, CheckCircle, Car, UserCheck, Home, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("home");

  const stats = {
    totalVisits: 24,
    completedVisits: 18,
    pendingVisits: 6,
    monthlyTarget: 30
  };

  const handleMainOption = (option: string) => {
    if (option === "visits") {
      navigate("/visits");
    } else if (option === "attendance") {
      navigate("/attendance");
    } else if (option === "conveyance") {
      navigate("/conveyance");
    }
  };

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => setActiveNav("home")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            activeNav === "home" ? "text-blue-600 bg-blue-50" : "text-gray-500"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button
          onClick={() => {
            handleMainOption("visits");
            setActiveNav("visits");
          }}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            activeNav === "visits" ? "text-blue-600 bg-blue-50" : "text-gray-500"
          }`}
        >
          <MapPin className="h-5 w-5" />
          <span className="text-xs mt-1">Visits</span>
        </button>
        
        <button
          onClick={() => {
            handleMainOption("attendance");
            setActiveNav("attendance");
          }}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            activeNav === "attendance" ? "text-blue-600 bg-blue-50" : "text-gray-500"
          }`}
        >
          <UserCheck className="h-5 w-5" />
          <span className="text-xs mt-1">Attendance</span>
        </button>
        
        <button
          onClick={() => {
            handleMainOption("conveyance");
            setActiveNav("conveyance");
          }}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-blue-500 text-white">SK</AvatarFallback>
            </Avatar>
            <img 
              src="/lovable-uploads/97d23ffb-bdd1-4fb2-b42e-3ff013395744.png" 
              alt="VEKA Logo" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold">Sai Kiran</h1>
              <p className="text-blue-100 text-sm">Field Sales Executive</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 rounded-xl">
              <Bell className="h-5 w-5" />
            </Button>
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
