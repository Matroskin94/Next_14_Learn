import { TrashIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

interface IDeleteInvoiceProps {
  id: string;
}

export const DeleteInvoice: FC<IDeleteInvoiceProps> = () => {
  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
};
