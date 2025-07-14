import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<OpportunityDetail | null>(null);
  const [fabricator, setFabricator] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 🔐 Fetch Salesforce Access Token (same logic from FetchData.tsx)
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
    } catch (err) {
      console.error("Error fetching access token:", err);
    }
  };

  const fetchLeadDetail = async (token: string) => {
    try {
      const query = `SELECT Id,Name,StageName,LeadSource,Type,Fabricator_Name__c,Quantity__c,Length__c,Breadth__c,Depth__c,
        Account.BillingStreet,Account.BillingCity,Account.BillingState,Account.BillingPostalCode,Account.BillingCountry,
        (SELECT Contact.Name,Contact.Phone,Contact.Email FROM OpportunityContactRoles),
        (SELECT Quantity,UnitPrice,TotalPrice,PricebookEntry.Product2.Name,PricebookEntry.Product2.ProductCode,PricebookEntry.Product2.Description FROM OpportunityLineItems)
        FROM Opportunity WHERE Id='${id}'`;

      const response = await axios.get(
        `https://gtmdataai-dev-ed.develop.my.salesforce.com/services/data/v62.0/query?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setLead(response.data.records?.[0] || null);
    } catch (error) {
      console.error("Error fetching lead detail:", error);
    }
  };

  const handleAssign = async () => {
    if (!fabricator || !id || !accessToken) return;
    try {
      await axios.post(
        "https://gtmdataai-dev-ed.develop.my.salesforce.com/services/apexrest/updateVisitNotes",
        {
          type: "opportunity",
          opportunityId: id,
          fabricatorName: fabricator,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Fabricator assigned successfully!", {
        position: "top-center",
        theme: "colored",
      });
      navigate("/leads");
    } catch (error) {
      toast.error("Failed to assign fabricator.");
      console.error("Error assigning fabricator:", error);
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchLeadDetail(accessToken);
    }
  }, [accessToken]);

  if (!lead) return <div className="p-4">Loading...</div>;

  const contact = lead.OpportunityContactRoles?.records?.[0]?.Contact;

  return (
    <div className="p-4 space-y-6">
      {/* Section 1 - Summary */}
      <div className="bg-blue-700 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-2">{lead.Name}</h2>
        <p>
          Stage: <Badge>{lead.StageName}</Badge>
        </p>
        <p>Lead Source: {lead.LeadSource || "N/A"}</p>
        <p>Type: {lead.Type || "N/A"}</p>
        <p>
          Address:{" "}
          {[lead.Account?.BillingStreet, lead.Account?.BillingCity, lead.Account?.BillingState, lead.Account?.BillingCountry]
            .filter(Boolean)
            .join(", ")}
        </p>
        <p>Phone: {contact?.Phone || "N/A"}</p>
        <p>Email: {contact?.Email || "N/A"}</p>
      </div>

      {/* Section 2 - Product Info */}
      <div className="bg-blue-100 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-blue-900">
          Product Details
        </h3>
        {lead.OpportunityLineItems?.records?.length ? (
          lead.OpportunityLineItems.records.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">
                Product: {item.PricebookEntry.Product2.Name}
              </p>
              <p>Quantity: {item.Quantity}</p>
              <p>Total Price: ₹{item.TotalPrice}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">No product details available.</p>
        )}
      </div>

      {/* Section 3 - Fabricator Assign */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
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
            className="bg-blue-700 hover:bg-blue-800 text-white mt-2"
            onClick={handleAssign}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
