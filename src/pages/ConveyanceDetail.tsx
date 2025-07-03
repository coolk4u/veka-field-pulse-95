
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Car, MapPin, Clock, Plus, Bell, User, Play, Square } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ConveyanceDetail = () => {
  const navigate = useNavigate();
  const [activeTravel, setActiveTravel] = useState<number | null>(null);
  const [travels] = useState([
    {
      id: 1,
      title: "Client Visit - Ramesh Construction",
      startTime: "9:00 AM",
      endTime: "11:30 AM",
      status: "completed",
      punchIns: [
        { time: "9:00 AM", location: "Office, Banjara Hills", type: "start" },
        { time: "9:45 AM", location: "Client Site, Kondapur", type: "arrival" },
        { time: "11:30 AM", location: "Client Site, Kondapur", type: "departure" }
      ]
    },
    {
      id: 2,
      title: "Site Inspection - Lakshmi Builders",
      startTime: "2:00 PM",
      status: "active",
      punchIns: [
        { time: "2:00 PM", location: "Client Site, Jubilee Hills", type: "start" }
      ]
    }
  ]);

  const handleStartTravel = () => {
    const newTravelId = Date.now();
    setActiveTravel(newTravelId);
    toast({
      title: "Travel Started",
      description: "Your travel has been started and location is being tracked.",
    });
  };

  const handlePunchIn = (travelId: number) => {
    toast({
      title: "Location Punched",
      description: "Your current location has been recorded.",
    });
  };

  const handleStopTravel = () => {
    setActiveTravel(null);
    toast({
      title: "Travel Completed",
      description: "Your travel has been completed and logged.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="text-white hover:bg-white/20 p-2 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Conveyance</h1>
              <p className="text-blue-100">Track your travel expenses</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 rounded-xl">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 rounded-xl">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Today's Travels</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="bg-white/20 p-2 rounded-xl">
                <Car className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Distance</p>
                <p className="text-2xl font-bold text-white">45 km</p>
              </div>
              <div className="bg-white/20 p-2 rounded-xl">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Start Travel Button */}
        <Button 
          onClick={activeTravel ? handleStopTravel : handleStartTravel}
          className={`w-full h-14 rounded-2xl text-lg font-semibold ${
            activeTravel 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-white text-blue-600 hover:bg-gray-100"
          }`}
        >
          {activeTravel ? (
            <>
              <Square className="h-6 w-6 mr-2" />
              Stop Travel
            </>
          ) : (
            <>
              <Play className="h-6 w-6 mr-2" />
              Start New Travel
            </>
          )}
        </Button>
      </div>

      <div className="p-6 -mt-6 space-y-6">
        {/* Travel List */}
        <Card className="rounded-3xl border-0 shadow-xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Today's Travel Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {travels.map((travel) => (
              <Card 
                key={travel.id} 
                className="border border-gray-100 rounded-2xl overflow-hidden"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{travel.title}</h3>
                    <Badge 
                      variant={travel.status === "completed" ? "default" : "secondary"}
                      className={travel.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                    >
                      {travel.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{travel.startTime}</span>
                      {travel.endTime && <span>- {travel.endTime}</span>}
                    </div>
                  </div>

                  {/* Punch-in History */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Location History:</h4>
                    {travel.punchIns.map((punchIn, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{punchIn.location}</p>
                          <p className="text-xs text-gray-500">{punchIn.time} - {punchIn.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {travel.status === "active" && (
                    <Button 
                      onClick={() => handlePunchIn(travel.id)}
                      variant="outline"
                      size="sm"
                      className="w-full rounded-xl"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Punch In Current Location
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConveyanceDetail;
