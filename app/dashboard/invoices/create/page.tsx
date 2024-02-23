import { fetchCustomers } from "@/app/lib/requests";
import { CreateInvoiceForm } from "./components";
import { Breadcrumbs } from "@/app/ui/Breadcrumbs";

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