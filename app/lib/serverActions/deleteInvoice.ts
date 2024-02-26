'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export const deleteInvoice = async (id: string) => {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (e) {
    return { message: 'Database Error: Failed to Update Invoice' };
  }
  revalidatePath('/dashboard/invoices');
};
