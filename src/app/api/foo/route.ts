import { NextResponse } from 'next/server';
import { getServerLocaleByCookie } from '@/features/locale/server/get-server-locale-by-cookie';

export async function GET() {
  const locale = await getServerLocaleByCookie();
  return NextResponse.json({
    locale,
    foo: 1,
    at: Date.now(),
  });
}
