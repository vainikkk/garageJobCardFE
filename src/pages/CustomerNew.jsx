
import PageLayout from "../components/layout/PageLayout";
import CustomerForm from "../components/customer/CustomerForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CustomerNew = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/customers" className="text-garage-primary hover:text-garage-primary/80">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Customer</h1>
        </div>
        <p className="text-gray-500 mb-6">Create a new customer record in the system.</p>
        
        <CustomerForm />
      </div>
    </PageLayout>
  );
};

export default CustomerNew;
