
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Camera, MapPin, CheckCircle, Bell, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AttendanceDetail = () => {
  const navigate = useNavigate();
  const [transportMode, setTransportMode] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [odometerReading, setOdometerReading] = useState("");
  const [locationCaptured, setLocationCaptured] = useState(true);

  const handleSubmit = () => {
    if (!transportMode) {
      toast({
        title: "Transport Mode Required",
        description: "Please select your mode of transport.",
        variant: "destructive"
      });
      return;
    }

    if (transportMode === "private" && !vehicleType) {
      toast({
        title: "Vehicle Type Required",
        description: "Please select your vehicle type.",
        variant: "destructive"
      });
      return;
    }

    if ((vehicleType === "car" || vehicleType === "bike") && !odometerReading) {
      toast({
        title: "Odometer Reading Required",
        description: "Please enter the odometer reading.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Attendance Captured",
      description: "Your attendance has been successfully recorded.",
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
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
              <h1 className="text-xl font-bold">Mark Attendance</h1>
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

        {locationCaptured && (
          <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-200" />
              <span className="text-green-100 font-medium">Location Captured Successfully</span>
            </div>
          </div>
        )}

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <p className="text-white font-medium">January 2, 2025 - 9:30 AM</p>
          <p className="text-blue-100 text-sm">Recording attendance details</p>
        </div>
      </div>

      <div className="p-6 -mt-6 space-y-6">
        <Card className="rounded-3xl border-0 shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Transport Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="transportMode" className="text-gray-700 font-medium">Mode of Transport *</Label>
              <Select value={transportMode} onValueChange={setTransportMode}>
                <SelectTrigger className="rounded-xl border-gray-200 h-12">
                  <SelectValue placeholder="Select transport mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {transportMode === "private" && (
              <div>
                <Label htmlFor="vehicleType" className="text-gray-700 font-medium">Vehicle Type *</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger className="rounded-xl border-gray-200 h-12">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="bike">Bike</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {transportMode === "public" && (
              <div>
                <Label htmlFor="publicVehicle" className="text-gray-700 font-medium">Public Transport Type *</Label>
                <Select>
                  <SelectTrigger className="rounded-xl border-gray-200 h-12">
                    <SelectValue placeholder="Select public transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="train">Train</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(vehicleType === "car" || vehicleType === "bike") && (
              <>
                <div>
                  <Label htmlFor="odometer" className="text-gray-700 font-medium">Odometer Reading (KM) *</Label>
                  <Input
                    id="odometer"
                    type="number"
                    placeholder="Enter current odometer reading"
                    value={odometerReading}
                    onChange={(e) => setOdometerReading(e.target.value)}
                    className="rounded-xl border-gray-200 h-12"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">Odometer Photo</Label>
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-xl h-20 border-dashed border-gray-300 hover:bg-gray-50"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="h-6 w-6 text-gray-400" />
                        <span className="text-sm text-gray-600">Take Photo of Odometer</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </>
            )}

            <Button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-12 text-lg font-medium"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Submit Attendance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceDetail;
