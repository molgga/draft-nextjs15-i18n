import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import {
  LocaleConfigLangCookieKey,
  LocaleConfigDefault,
  LocaleConfigLangs,
  LocaleVo,
} from '@/features/lang/types';

const i18nMiddleware = createMiddleware(routing);

/**
 * 언어 꺼내기
 */
function getLocale(request: NextRequest): LocaleVo {
  // 헤더 accept-language
  const acceptedLanguages = request.headers.get('accept-language') || 'en';
  const cookieLang = request.cookies.get(LocaleConfigLangCookieKey)?.value;
  console.log('acceptedLanguages', acceptedLanguages);
  console.log('cookieLang', cookieLang);
  if (cookieLang) {
    const locale = LocaleConfigLangs.find((code) => code === cookieLang);
    if (locale) {
      return { locale, lang: locale.split('-')[0] };
    }
  }

  if (acceptedLanguages) {
    const langCodes = acceptedLanguages.split(',').map((v) => v.split('-')[0]); // 헤더 값에서 언어 코드만 ['en-US'] > ['en']
    const locale = langCodes.find((code) => LocaleConfigLangs.includes(code)); // locale 찾기
    if (locale) {
      return { locale, lang: locale.split('-')[0] };
    }
  }
  // 지원하는 언어셋 없다면 기본 언어
  return {
    locale: LocaleConfigDefault,
    lang: LocaleConfigDefault.split('-')[0],
  };
}

/**
 * 언어셋 미들웨어
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { lang } = getLocale(request);

  const pathLocale = LocaleConfigLangs.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  // console.log('pathLocale', pathLocale);
  // console.log('lang, locale', lang, locale);
  if (pathLocale) {
    // const response = NextResponse.next();
    return i18nMiddleware(request);
  }
  request.nextUrl.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // 모든 패스에 locale 적용, 특정 패턴 제외
    '/((?!_next|api).*)',
  ],
};
