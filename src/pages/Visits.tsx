import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, CheckCircle, ArrowLeft, Bell, User, Calendar, TrendingUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Visit {
  Id: string;
  Name__c: string;
  Email__c: string;
  Phone__c: string;
  Address__c: string;
  Status__c: string;
  Location__c: string;
  Date__c: string;
  Time__c: string;
}

const Visits = () => {
  const navigate = useNavigate();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const stats = {
    totalVisits: visits.length,
    completedVisits: visits.filter(v => v.Status__c === "Completed").length,
    pendingVisits: visits.filter(v => v.Status__c === "Pending").length,
    monthlyTarget: 30
  };

  // Step 1: Get Access Token
  const getAccessToken = async () => {
    const tokenUrl = 'https://gtmdataai-dev-ed.develop.my.salesforce.com/services/oauth2/token';
    const clientId = '3MVG9OGq41FnYVsFObrvP_I4DU.xo6cQ3wP75Sf7rxOPMtz0Ofj5RIDyM83GlmVkGFbs_0aLp3hlj51c8GQsq';
    const clientSecret = 'A9699851D548F0C076BB6EB07C35FEE1822752CF5B2CC7F0C002DC4ED9466492';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
      const response = await axios.post(tokenUrl, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      setAccessToken(response.data.access_token);
    } catch (err) {
      console.error("❌ Failed to fetch access token", err);
    }
  };

  // Step 2: Fetch Visits using the token
  const fetchVisits = async (token: string) => {
    try {
      const response = await axios.get(
        "https://gtmdataai-dev-ed.develop.my.salesforce.com/services/data/v62.0/query?q=SELECT+Id,+Name__c,+Email__c,+Phone__c,+Address__c,+Status__c,+Location__c,+Date__c,+Time__c+FROM+Visit__c+WHERE+Status__c+IN+('Pending','In+Progress')",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        }
      );
      setVisits(response.data.records);
    } catch (error) {
      console.error("❌ Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchVisits(accessToken);
    }
  }, [accessToken]);

  const handleVisitDetail = (visit: Visit) => {
    navigate(`/visit/${visit.Id}`, { state: { visit } });
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
                  key={visit.Id}
                  className="hover:shadow-md transition-all cursor-pointer border border-gray-100 rounded-2xl overflow-hidden"
                  onClick={() => handleVisitDetail(visit)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{visit.Location__c}</h3>
                          <Badge
                            variant={visit.Status__c === "Completed" ? "default" : "secondary"}
                            className={visit.Status__c === "Completed" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                          >
                            {visit.Status__c}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{visit.Address__c}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">{visit.Date__c}</span> {/* Replace with actual date if available */}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">{visit.Time__c}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blue-600 mt-2 font-medium">{visit.Name__c}</p>
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
