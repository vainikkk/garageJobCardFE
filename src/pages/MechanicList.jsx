
import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { mechanics } from "../lib/mockData";
import { User, Plus, Search, Wrench } from "lucide-react";
import { toast } from "sonner";

const MechanicList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredMechanics = mechanics.filter((mechanic) =>
    mechanic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddMechanic = () => {
    toast.info("Add Mechanic functionality will be implemented soon.");
  };
  
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mechanics</h1>
        <p className="text-gray-500">View and manage mechanic profiles and assignments</p>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="relative w-full md:w-auto md:min-w-[320px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search mechanics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button onClick={handleAddMechanic}>
          <Plus className="mr-2 h-4 w-4" /> Add Mechanic
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMechanics.length > 0 ? (
          filteredMechanics.map((mechanic) => (
            <div key={mechanic.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="bg-garage-light p-3 rounded-full">
                      <User className="h-8 w-8 text-garage-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{mechanic.name}</h3>
                      <p className="text-sm text-gray-500">{mechanic.contactNumber || "No contact number"}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-sm ${
                    mechanic.activeJobCards > 0
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {mechanic.activeJobCards > 0
                      ? `${mechanic.activeJobCards} active job${mechanic.activeJobCards > 1 ? 's' : ''}`
                      : "Available"}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Wrench className="h-4 w-4 mr-1" /> Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mechanic.expertise?.map((exp, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {exp}
                      </span>
                    )) || (
                      <span className="text-gray-500 text-sm">No expertise listed</span>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Assign Job</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <div className="flex justify-center mb-4">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No mechanics found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or add a new mechanic.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MechanicList;
