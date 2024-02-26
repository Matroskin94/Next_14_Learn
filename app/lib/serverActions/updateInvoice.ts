'use server';

import { sql } from '@vercel/postgres';
import { InvoiceSchema } from '../schemas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateInvoice = async (id: string, formData: FormData) => {
  const { customerId, amount, status } = InvoiceSchema.omit({
    id: true,
    date: true,
  }).parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (e) {
    return {
      message: 'Database Error: Failed to Delete Invoice.'
    }
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};
