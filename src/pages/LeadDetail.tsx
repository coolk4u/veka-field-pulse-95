import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OpportunityDetail {
  Id: string;
  Name: string;
  StageName: string;
  LeadSource: string;
  Type: string;
  Account?: {
    BillingStreet?: string;
    BillingCity?: string;
    BillingState?: string;
    BillingPostalCode?: string;
    BillingCountry?: string;
  };
  OpportunityContactRoles?: {
    records?: {
      Contact: {
        Name: string;
        Phone: string;
        Email: string;
      };
    }[];
  };
  OpportunityLineItems?: {
    records?: {
      Quantity: number;
      UnitPrice: number;
      TotalPrice: number;
      PricebookEntry: {
        Product2: {
          Name: string;
          ProductCode: string;
          Description: string;
        };
      };
    }[];
  };
  Length__c?: string;
  Breadth__c?: string;
  Depth__c?: string;
  Quantity__c?: number;
  Fabricator_Name__c?: string;
}

// Dummy data for demonstration
const DUMMY_OPPORTUNITIES: OpportunityDetail[] = [
  {
    Id: "1",
    Name: "Premium Office Windows Installation",
    StageName: "Proposal",
    LeadSource: "Website",
    Type: "New Business",
    Account: {
      BillingStreet: "123 Business Ave",
      BillingCity: "Mumbai",
      BillingState: "Maharashtra",
      BillingPostalCode: "400001",
      BillingCountry: "India"
    },
    OpportunityContactRoles: {
      records: [
        {
          Contact: {
            Name: "Rajesh Mehta",
            Phone: "+91-9876543210",
            Email: "rajesh.mehta@example.com"
          }
        }
      ]
    },
    OpportunityLineItems: {
      records: [
        {
          Quantity: 50,
          UnitPrice: 1200,
          TotalPrice: 60000,
          PricebookEntry: {
            Product2: {
              Name: "Premium Glass Panels",
              ProductCode: "GLASS-PREM",
              Description: "High-quality tempered glass panels"
            }
          }
        },
        {
          Quantity: 20,
          UnitPrice: 800,
          TotalPrice: 16000,
          PricebookEntry: {
            Product2: {
              Name: "Aluminum Frames",
              ProductCode: "FRAME-ALU",
              Description: "Durable aluminum window frames"
            }
          }
        }
      ]
    },
    Length__c: "2.5m",
    Breadth__c: "1.8m",
    Depth__c: "0.1m",
    Quantity__c: 10,
    Fabricator_Name__c: ""
  },
  {
    Id: "2",
    Name: "Residential Balcony Glass Railings",
    StageName: "Negotiation",
    LeadSource: "Referral",
    Type: "Existing Customer",
    Account: {
      BillingStreet: "456 Residential Lane",
      BillingCity: "Bangalore",
      BillingState: "Karnataka",
      BillingPostalCode: "560001",
      BillingCountry: "India"
    },
    OpportunityContactRoles: {
      records: [
        {
          Contact: {
            Name: "Priya Sharma",
            Phone: "+91-9123456789",
            Email: "priya.sharma@example.com"
          }
        }
      ]
    },
    OpportunityLineItems: {
      records: [
        {
          Quantity: 30,
          UnitPrice: 1500,
          TotalPrice: 45000,
          PricebookEntry: {
            Product2: {
              Name: "Tempered Safety Glass",
              ProductCode: "GLASS-SAFE",
              Description: "Safety-rated tempered glass for railings"
            }
          }
        }
      ]
    },
    Length__c: "3.2m",
    Breadth__c: "1.2m",
    Depth__c: "0.15m",
    Quantity__c: 8,
    Fabricator_Name__c: "Rajesh Kumar"
  },
  {
    Id: "3",
    Name: "Commercial Store Front Installation",
    StageName: "Closed Won",
    LeadSource: "Trade Show",
    Type: "New Business",
    Account: {
      BillingStreet: "789 Commercial Street",
      BillingCity: "Delhi",
      BillingState: "Delhi",
      BillingPostalCode: "110001",
      BillingCountry: "India"
    },
    OpportunityContactRoles: {
      records: [
        {
          Contact: {
            Name: "Amit Patel",
            Phone: "+91-9988776655",
            Email: "amit.patel@example.com"
          }
        }
      ]
    },
    OpportunityLineItems: {
      records: [
        {
          Quantity: 15,
          UnitPrice: 2500,
          TotalPrice: 37500,
          PricebookEntry: {
            Product2: {
              Name: "Laminated Glass",
              ProductCode: "GLASS-LAM",
              Description: "Laminated security glass"
            }
          }
        }
      ]
    },
    Length__c: "4.0m",
    Breadth__c: "2.5m",
    Depth__c: "0.2m",
    Quantity__c: 5,
    Fabricator_Name__c: "Sachin Gangadhar"
  }
];

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<OpportunityDetail | null>(null);
  const [fabricator, setFabricator] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeadDetail = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const foundLead = DUMMY_OPPORTUNITIES.find(opp => opp.Id === id) || null;
      setLead(foundLead);
      setIsLoading(false);
      
      if (!foundLead) {
        toast.error("Lead not found!");
      }
    }, 500);
  };

  const handleAssign = async () => {
    if (!fabricator || !id) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the dummy data (in a real app, this would be an API call)
      const updatedLead = { ...lead, Fabricator_Name__c: fabricator };
      setLead(updatedLead as OpportunityDetail);
      
      toast.success("Fabricator assigned successfully!", {
        position: "top-center",
        theme: "colored",
      });
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigate("/leads");
      }, 1000);
      
    } catch (error) {
      toast.error("Failed to assign fabricator.");
      console.error("Error assigning fabricator:", error);
    }
  };

  useEffect(() => {
    fetchLeadDetail();
  }, [id]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  
  if (!lead) return <div className="p-4 text-red-500">Lead not found!</div>;

  const contact = lead.OpportunityContactRoles?.records?.[0]?.Contact;

  return (
    <div className="p-4 space-y-6">
      {/* Section 1 - Summary */}
      <div className="bg-blue-700 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-2">{lead.Name}</h2>
        <div className="space-y-2">
          <p>
            Stage: <Badge variant="secondary" className="ml-2">{lead.StageName}</Badge>
          </p>
          <p>Lead Source: {lead.LeadSource || "N/A"}</p>
          <p>Type: {lead.Type || "N/A"}</p>
          <p>
            Address:{" "}
            {[lead.Account?.BillingStreet, lead.Account?.BillingCity, lead.Account?.BillingState, lead.Account?.BillingCountry]
              .filter(Boolean)
              .join(", ")}
          </p>
          <p>Contact: {contact?.Name || "N/A"}</p>
          <p>Phone: {contact?.Phone || "N/A"}</p>
          <p>Email: {contact?.Email || "N/A"}</p>
          {lead.Fabricator_Name__c && (
            <p className="mt-3">
              Current Fabricator: <span className="font-semibold">{lead.Fabricator_Name__c}</span>
            </p>
          )}
        </div>
      </div>

      {/* Section 2 - Dimensions */}
      {lead.Length__c && lead.Breadth__c && (
        <div className="bg-blue-50 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">
            Dimensions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-500">Length</p>
              <p className="font-semibold">{lead.Length__c}</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-500">Breadth</p>
              <p className="font-semibold">{lead.Breadth__c}</p>
            </div>
            {lead.Depth__c && (
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-500">Depth</p>
                <p className="font-semibold">{lead.Depth__c}</p>
              </div>
            )}
            {lead.Quantity__c && (
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-semibold">{lead.Quantity__c}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 3 - Product Info */}
      <div className="bg-blue-100 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-blue-900">
          Product Details
        </h3>
        {lead.OpportunityLineItems?.records?.length ? (
          <div className="space-y-4">
            {lead.OpportunityLineItems.records.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">
                      {item.PricebookEntry.Product2.Name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.PricebookEntry.Product2.Description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Product Code: {item.PricebookEntry.Product2.ProductCode}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">₹{item.TotalPrice.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">
                      {item.Quantity} × ₹{item.UnitPrice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Estimated Value:</span>
                <span>
                  ₹{lead.OpportunityLineItems.records.reduce((sum, item) => sum + item.TotalPrice, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">No product details available.</p>
        )}
      </div>

      {/* Section 4 - Fabricator Assign */}
      {!lead.Fabricator_Name__c && (
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Assign Fabricator</h3>
          <Select onValueChange={(val) => setFabricator(val)}>
            <SelectTrigger className="w-full max-w-sm mb-4">
              <SelectValue placeholder="Select Fabricator" />
            </SelectTrigger>
            <SelectContent>
              {["Rajesh Kumar", "Rohit Isor", "Sachin Gangadhar", "Arijit Rout", "Darshan Patil"].map((name) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-center">
            <Button
              className="bg-blue-700 hover:bg-blue-800 text-white mt-2 px-8"
              onClick={handleAssign}
              disabled={!fabricator}
            >
              Submit Assignment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDetail;
