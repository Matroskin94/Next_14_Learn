import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Revenue } from '../definitions';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
