import { Search } from '@/app/ui/Search';
import { CreateInvoice } from '@/app/ui/buttons';
import { lusitana } from '@/app/ui/fonts';
import { FC, Suspense } from 'react';
import {
  InvoicesTable,
  InvoicesTableSkeleton,
} from './components/InvoicesTable';
import { fetchInvoicesPages } from '@/app/lib/requests';
import { Pagination } from './components/Pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices',
};

interface IInvoicePageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const InvoicesPage: FC<IInvoicePageProps> = async ({ searchParams }) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default InvoicesPage;
