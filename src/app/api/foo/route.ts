import { NextResponse } from 'next/server';
import { getServerLangByCookie } from '@/features/lang/server/get-server-lang-by-cookie';

export async function GET() {
  const lang = await getServerLangByCookie();
  return NextResponse.json({
    lang,
    foo: 1,
    at: Date.now(),
  });
}
