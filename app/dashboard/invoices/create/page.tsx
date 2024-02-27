import { fetchCustomers } from "@/app/lib/requests";
import { CreateInvoiceForm } from "./components";
import { Breadcrumbs } from "@/app/ui/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create Invoice',
};

const CreatePage = async () => {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <CreateInvoiceForm customers={customers} />
    </main>
  );
}

export default CreatePage