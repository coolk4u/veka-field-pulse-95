import { useEffect, useState } from "react";
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

// Dummy data
const dummyLeads: Lead[] = [
  {
    Id: "1",
    Name: "John Smith",
    StageName: "Qualified",
    LeadSource: "Website",
    Type: "New Customer",
    Account: {
      BillingStreet: "123 Main St",
      BillingCity: "New York",
      BillingState: "NY",
      BillingPostalCode: "10001",
      BillingCountry: "USA"
    },
    OpportunityContactRoles: {
      records: [{
        Contact: {
          Phone: "+1 (555) 123-4567",
          Email: "john.smith@example.com"
        }
      }]
    }
  },
  {
    Id: "2",
    Name: "Sarah Johnson",
    StageName: "Proposal",
    LeadSource: "Referral",
    Type: "Existing Customer",
    Account: {
      BillingStreet: "456 Oak Ave",
      BillingCity: "Chicago",
      BillingState: "IL",
      BillingPostalCode: "60601",
      BillingCountry: "USA"
    },
    OpportunityContactRoles: {
      records: [{
        Contact: {
          Phone: "+1 (555) 987-6543",
          Email: "sarah.j@example.com"
        }
      }]
    }
  },
  {
    Id: "3",
    Name: "Robert Chen",
    StageName: "Negotiation",
    LeadSource: "Trade Show",
    Type: "Partner",
    Account: {
      BillingStreet: "789 Tech Blvd",
      BillingCity: "San Francisco",
      BillingState: "CA",
      BillingPostalCode: "94107",
      BillingCountry: "USA"
    },
    OpportunityContactRoles: {
      records: [{
        Contact: {
          Phone: "+1 (555) 456-7890",
          Email: "robert.chen@example.com"
        }
      }]
    }
  },
  {
    Id: "4",
    Name: "Maria Garcia",
    StageName: "Closed Won",
    LeadSource: "Social Media",
    Type: "New Customer",
    Account: {
      BillingStreet: "321 Market St",
      BillingCity: "Miami",
      BillingState: "FL",
      BillingPostalCode: "33101",
      BillingCountry: "USA"
    },
    OpportunityContactRoles: {
      records: [{
        Contact: {
          Phone: "+1 (555) 789-0123",
          Email: "maria.g@example.com"
        }
      }]
    }
  },
  {
    Id: "5",
    Name: "David Wilson",
    StageName: "Discovery",
    LeadSource: "Cold Call",
    Type: "Prospect",
    Account: {
      BillingStreet: "654 Pine Rd",
      BillingCity: "Seattle",
      BillingState: "WA",
      BillingPostalCode: "98101",
      BillingCountry: "USA"
    },
    OpportunityContactRoles: {
      records: [{
        Contact: {
          Phone: "+1 (555) 234-5678",
          Email: "david.w@example.com"
        }
      }]
    }
  }
];

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setLeads(dummyLeads);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
