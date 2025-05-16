
import PageLayout from "../components/layout/PageLayout";
import InventoryForm from "../components/inventory/InventoryForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const InventoryNew = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/inventory" className="text-garage-primary hover:text-garage-primary/80">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add Inventory Item</h1>
        </div>
        <p className="text-gray-500 mb-6">Create a new inventory item in the system.</p>
        
        <InventoryForm />
      </div>
    </PageLayout>
  );
};

export default InventoryNew;
