import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  return NextResponse.json({
    lang: cookieStore.get('NEXT_LOCALE')?.value || '-',
    foo: 1,
    at: Date.now(),
  });
}
