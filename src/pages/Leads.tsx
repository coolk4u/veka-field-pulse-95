import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Package, Phone, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Lead {
  Id: string;
  Name: string;
  StageName: string;
  LeadSource?: string;
  Type?: string;
  Account?: {
    BillingStreet?: string;
    BillingCity?: string;
    BillingState?: string;
    BillingPostalCode?: string;
    BillingCountry?: string;
  };
  OpportunityContactRoles?: {
    records: {
      Contact: {
        Phone?: string;
        Email?: string;
      };
    }[];
  };
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAccessToken = async () => {
    const salesforceUrl = "https://gtmdataai-dev-ed.develop.my.salesforce.com/services/oauth2/token";
    const clientId = "3MVG9OGq41FnYVsFObrvP_I4DU.xo6cQ3wP75Sf7rxOPMtz0Ofj5RIDyM83GlmVkGFbs_0aLp3hlj51c8GQsq";
    const clientSecret = "A9699851D548F0C076BB6EB07C35FEE1822752CF5B2CC7F0C002DC4ED9466492";

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    try {
      const response = await axios.post(salesforceUrl, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error("Failed to fetch access token:", error);
    }
  };

  const fetchLeads = async (token: string) => {
    try {
      const response = await axios.get(
        "https://gtmdataai-dev-ed.develop.my.salesforce.com/services/data/v62.0/query?q=SELECT+Id,Name,StageName,LeadSource,Type,Fabricator_Name__c,Quantity__c,Length__c,Breadth__c,Depth__c,Owner.Name,Account.Name,Account.BillingStreet,Account.BillingCity,Account.BillingState,Account.BillingPostalCode,Account.BillingCountry,(SELECT+Contact.Name,Contact.Phone,Contact.Email+FROM+OpportunityContactRoles)+FROM+Opportunity+WHERE+Owner.Name='Sai Kiran'",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setLeads(response.data.records);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchLeads(accessToken);
    }
  }, [accessToken]);

  const filteredLeads = leads.filter((lead) =>
    lead.Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeft
          className="w-5 h-5 text-blue-700 cursor-pointer hover:text-blue-900"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl font-bold text-blue-700">My Leads</h1>
      </div>

      <Input
        placeholder="Search by Lead Name"
        className="mb-4 w-full max-w-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredLeads.map((lead) => {
        const contact = lead.OpportunityContactRoles?.records?.[0]?.Contact;
        const address = [
          lead.Account?.BillingStreet,
          lead.Account?.BillingCity,
          lead.Account?.BillingState,
          lead.Account?.BillingPostalCode,
          lead.Account?.BillingCountry,
        ]
          .filter(Boolean)
          .join(", ");

        return (
          <Card
            key={lead.Id}
            onClick={() => navigate(`/lead-detail/${lead.Id}`)}
            className="mb-4 bg-white shadow-md shadow-blue-100 border border-blue-100 rounded-xl cursor-pointer hover:scale-[1.01] transition-transform relative"
          >
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="text-xs">{lead.StageName}</Badge>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                {lead.Name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 pt-0">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Package className="w-4 h-4" />
                {lead.LeadSource || "No Lead Source"}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                🏷️ Type: {lead.Type || "No Type"}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {address || "No Address"}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {contact?.Phone || "No Phone"}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {contact?.Email || "No Email"}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Leads;
