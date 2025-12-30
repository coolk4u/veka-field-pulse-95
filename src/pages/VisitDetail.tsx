import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  MapPin,
  Clock,
  CheckCircle,
  Package,
  Plus,
  Minus,
  ArrowLeft,
  Bell,
  User
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Dummy visit data in JSON format
const DUMMY_VISITS = [
  {
    id: "1",
    clientName: "John Smith Construction",
    address: "123 Main Street, Anytown, USA",
    type: "Site Inspection",
    status: "In Progress",
    date: "2024-01-15",
    time: "10:30 AM",
    contactPerson: "John Smith",
    phone: "+1 (555) 123-4567",
    location: "Construction Site - East Wing"
  },
  {
    id: "2",
    clientName: "Modern Homes Ltd",
    address: "456 Oak Avenue, Springfield",
    type: "Quote Discussion",
    status: "Pending",
    date: "2024-01-16",
    time: "2:00 PM",
    contactPerson: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    location: "Office Building, 3rd Floor"
  },
  {
    id: "3",
    clientName: "Green Builders Inc",
    address: "789 Pine Road, Greenville",
    type: "Product Demo",
    status: "Completed",
    date: "2024-01-14",
    time: "9:00 AM",
    contactPerson: "Michael Brown",
    phone: "+1 (555) 456-7890",
    location: "Showroom Center"
  }
];

const VisitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Find visit from dummy data or use passed state
  const visitFromState = location.state?.visit;
  const visitData = visitFromState || DUMMY_VISITS.find(visit => visit.id === id) || DUMMY_VISITS[0];

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [visitReason, setVisitReason] = useState("");
  const [notes, setNotes] = useState("");
  const [products, setProducts] = useState([
    { name: "Premium uPVC Door", quantity: 0 },
    { name: "Composite Door", quantity: 0 },
    { name: "French Door", quantity: 0 },
    { name: "Sliding Door", quantity: 0 }
  ]);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    toast({
      title: "Check-in Successful",
      description: "You have successfully checked in to the visit location."
    });
  };

  const updateProductQuantity = (index: number, change: number) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === index
          ? { ...product, quantity: Math.max(0, product.quantity + change) }
          : product
      )
    );
  };

  const handleCompleteVisit = () => {
    if (!visitReason) {
      toast({
        title: "Visit Reason Required",
        description: "Please select a visit reason before completing the visit.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call with dummy data
    const visitDataToSave = {
      visitId: visitData.id,
      clientName: visitData.clientName,
      visitReason: visitReason,
      visitNotes: notes,
      products: products.filter(p => p.quantity > 0),
      checkInTime: new Date().toISOString(),
      checkOutTime: new Date().toISOString(),
      status: "Completed"
    };

    console.log("Visit data saved:", visitDataToSave);
    
    toast({
      title: "Visit Completed",
      description: "Visit has been successfully completed and logged.",
    });

    setTimeout(() => navigate("/"), 2000);
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
              onClick={() => navigate("/visits")}
              className="text-white hover:bg-white/20 p-2 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Visit Details</h1>
              <p className="text-blue-100">Manage your field visit</p>
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

        {/* Visit Info Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{visitData.clientName}</h3>
            <Badge
              variant={visitData.status === "Completed" ? "default" : "secondary"}
              className={visitData.status === "Completed" ? "bg-green-500 text-white" : "bg-white/20 text-white"}
            >
              {visitData.status}
            </Badge>
          </div>

          <div className="space-y-3 text-white">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-200" />
              <span className="text-sm">{visitData.address}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-200" />
                <span className="text-sm">{visitData.date}</span>
              </div>
              <span className="text-sm">at {visitData.time}</span>
            </div>
            <div className="pt-2 border-t border-white/20">
              <p className="text-sm">
                <span className="text-blue-200">Contact:</span> {visitData.contactPerson}
              </p>
              <p className="text-sm">
                <span className="text-blue-200">Phone:</span> {visitData.phone}
              </p>
              <p className="text-sm">
                <span className="text-blue-200">Type:</span> {visitData.type}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 -mt-6 space-y-6">
        {/* Visit Location */}
        <Card className="rounded-3xl border-0 shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
              <MapPin className="h-5 w-5 text-blue-600" />
              Visit Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">{visitData.location}</p>
                <Button variant="outline" size="sm" className="mt-2 rounded-xl">
                  Open in Maps
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check-in or visit details */}
        {!isCheckedIn ? (
          <Card className="rounded-3xl border-0 shadow-xl bg-white">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Ready to start your visit?</h3>
              <p className="text-gray-600 mb-6">Please check-in to begin documenting your visit</p>
              <Button
                size="lg"
                onClick={handleCheckIn}
                className="bg-green-600 hover:bg-green-700 rounded-xl px-8 py-3"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Check-in to Visit
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Visit Details */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Visit Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="visitReason" className="text-gray-700 font-medium">Visit Reason *</Label>
                  <Select value={visitReason} onValueChange={setVisitReason}>
                    <SelectTrigger className="rounded-xl border-gray-200 h-12">
                      <SelectValue placeholder="Select visit reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inspection">Site Inspection</SelectItem>
                      <SelectItem value="service">Service Call</SelectItem>
                      <SelectItem value="quote">Quote Discussion</SelectItem>
                      <SelectItem value="demo">Product Demo</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-gray-700 font-medium">Visit Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes about the visit..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="rounded-xl border-gray-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            {visitReason === "quote" && (
              <Card className="rounded-3xl border-0 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                    <Package className="h-5 w-5 text-blue-600" />
                    VEKA Products & Quantities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-600">High-quality door solution</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateProductQuantity(index, -1)}
                            disabled={product.quantity === 0}
                            className="rounded-xl h-10 w-10 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="min-w-[3ch] text-center font-medium text-gray-900">
                            {product.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateProductQuantity(index, 1)}
                            className="rounded-xl h-10 w-10 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Complete Visit */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Complete Visit</h3>
                <p className="text-gray-600 mb-6">
                  Review all details and complete your visit to check out
                </p>
                <Button
                  size="lg"
                  onClick={handleCompleteVisit}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-3"
                >
                  Complete Visit & Check Out
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitDetail;
