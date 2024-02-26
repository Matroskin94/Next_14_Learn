'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { InvoiceSchema } from '../schemas';

interface IInvoiceFormState {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}

const createInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });

export const createInvoice = async (
  invoiceFormState: IInvoiceFormState,
  formData: FormData,
) => {
  // another way if formData to large
  // const rawFormData = Object.fromEntries(formData.entries())
  const validatedInvoiceFields = createInvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedInvoiceFields.success) {
    return {
      errors: validatedInvoiceFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { amount, customerId, status } = validatedInvoiceFields.data;

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};
