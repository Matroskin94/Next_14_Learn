import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FC } from 'react';

interface IUpdateInvoiceProps {
  id: string;
}

export const UpdateInvoice: FC<IUpdateInvoiceProps> = ({ id }) => {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
};
