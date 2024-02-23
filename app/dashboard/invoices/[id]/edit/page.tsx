import { Breadcrumbs } from '@/app/ui/Breadcrumbs';
import { EditInvoiceForm } from './components';
import { FC } from 'react';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/requests';

interface IEditInvoicePageProps {
  params: {
    id: string;
  };
}

const EditInvoicePage: FC<IEditInvoicePageProps> = async ({ params: { id } }) => {
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
};

export default EditInvoicePage;
