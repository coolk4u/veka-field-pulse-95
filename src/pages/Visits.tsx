import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, CheckCircle, ArrowLeft, Bell, User, Calendar, TrendingUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Visit {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  location: string;
  date: string;
  time: string;
  customerName: string;
}

// Dummy data in JSON format
const dummyVisitsData: Visit[] = [
  {
    id: "1",
    name: "TechCorp Office Visit",
    email: "john.doe@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Suite 500, San Francisco, CA 94105",
    status: "Pending",
    location: "TechCorp Headquarters",
    date: "2024-03-15",
    time: "10:30 AM",
    customerName: "John Doe"
  },
  {
    id: "2",
    name: "Retail Store Assessment",
    email: "sarah.smith@retailco.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Avenue, Chicago, IL 60601",
    status: "Completed",
    location: "Downtown Retail Store",
    date: "2024-03-14",
    time: "2:00 PM",
    customerName: "Sarah Smith"
  },
  {
    id: "3",
    name: "Factory Safety Inspection",
    email: "mike.jones@manufacturing.com",
    phone: "+1 (555) 456-7890",
    address: "789 Industrial Way, Detroit, MI 48201",
    status: "In Progress",
    location: "Auto Manufacturing Plant",
    date: "2024-03-16",
    time: "9:00 AM",
    customerName: "Mike Jones"
  },
  {
    id: "4",
    name: "Hospital Equipment Check",
    email: "dr.lee@medicalcenter.org",
    phone: "+1 (555) 234-5678",
    address: "101 Health Blvd, Boston, MA 02115",
    status: "Pending",
    location: "General Hospital",
    date: "2024-03-17",
    time: "11:00 AM",
    customerName: "Dr. Jennifer Lee"
  },
  {
    id: "5",
    name: "School IT Infrastructure",
    email: "principal.wilson@school.edu",
    phone: "+1 (555) 876-5432",
    address: "202 Education Lane, Austin, TX 73301",
    status: "Completed",
    location: "Central High School",
    date: "2024-03-13",
    time: "1:30 PM",
    customerName: "Principal Wilson"
  }
];

const Visits = () => {
  const navigate = useNavigate();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const stats = {
    totalVisits: visits.length,
    completedVisits: visits.filter(v => v.status === "Completed").length,
    pendingVisits: visits.filter(v => v.status === "Pending").length,
    monthlyTarget: 30
  };

  // Fetch dummy data
  const fetchVisits = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setVisits(dummyVisitsData);
    } catch (error) {
      console.error("❌ Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleVisitDetail = (visit: Visit) => {
    navigate(`/visit/${visit.id}`, { state: { visit } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm"
              onClick={() => navigate("/")}
              className="text-white hover:bg-white/20 p-2 rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">My Visits</h1>
              <p className="text-blue-100">Track your field activities</p>
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

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Visits</p>
                <p className="text-2xl font-bold text-white">{stats.totalVisits}</p>
              </div>
              <div className="bg-white/20 p-2 rounded-xl">
                <User className="h-6 w-6 text-white" />
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
            <CardTitle className="text-xl">Recent Visits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <p>Loading visits...</p>
            ) : visits.length === 0 ? (
              <p>No visits found</p>
            ) : (
              visits.map((visit) => (
                <Card
                  key={visit.id}
                  className="hover:shadow-md transition-all cursor-pointer border border-gray-100 rounded-2xl overflow-hidden"
                  onClick={() => handleVisitDetail(visit)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{visit.location}</h3>
                          <Badge
                            variant={visit.status === "Completed" ? "default" : "secondary"}
                            className={visit.status === "Completed" ? "bg-green-100 text-green-800" : 
                                     visit.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                                     "bg-orange-100 text-orange-800"}
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
                        <p className="text-sm text-blue-600 mt-2 font-medium">{visit.customerName}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                        View →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Visits;
