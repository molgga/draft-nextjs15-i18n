import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import {
  LocaleConfigCookieKey,
  LocaleConfigDefault,
  LocaleConfigLocales,
  LocaleVo,
} from '@/features/locale/types';

const i18nMiddleware = createMiddleware(routing);

/**
 * 언어 꺼내기
 */
function getLocale(request: NextRequest): LocaleVo {
  // 헤더 accept-language
  const acceptedLanguages = request.headers.get('accept-language') || 'en';
  const cookieLocale = request.cookies.get(LocaleConfigCookieKey)?.value;
  console.log('acceptedLanguages', acceptedLanguages);
  console.log('cookieLocale', cookieLocale);
  if (cookieLocale) {
    const localeFull = LocaleConfigLocales.find(
      (code) => code === cookieLocale
    );
    if (localeFull) {
      return { localeFull, locale: localeFull.split('-')[0] };
    }
  }

  if (acceptedLanguages) {
    const locales = acceptedLanguages.split(',').map((v) => v.split('-')[0]); // 헤더 값에서 언어 코드만 ['en-US'] > ['en']
    const localeFull = locales.find((code) =>
      LocaleConfigLocales.includes(code)
    ); // locale 찾기
    if (localeFull) {
      return { localeFull, locale: localeFull.split('-')[0] };
    }
  }
  // 지원하는 언어셋 없다면 기본 언어
  return {
    localeFull: LocaleConfigDefault,
    locale: LocaleConfigDefault.split('-')[0],
  };
}

/**
 * 언어셋 미들웨어
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale } = getLocale(request);

  const pathLocale = LocaleConfigLocales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  console.log('pathLocale', pathLocale);
  if (pathLocale) {
    return i18nMiddleware(request);
  }
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // 모든 패스에 locale 적용, 특정 패턴 제외
    '/((?!_next|api).*)',
  ],
};
