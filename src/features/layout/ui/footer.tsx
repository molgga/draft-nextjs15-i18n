'use client';

import { BrowserCookie } from '@jood/helpdesk-module/browser-cookie';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  const handleLocaleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = evt.target.value;
    const CookeyKey = Object.freeze({ Lang: 'fe-lang' });
    const cookie = new BrowserCookie();
    cookie.set({ name: CookeyKey.Lang, value: lang });
    const withoutLangPath = pathname.replace(/^\/(en|ko|ja)/, '');
    location.href = `/${lang}${withoutLangPath}`;
  };

  return (
    <div>
      <select onChange={handleLocaleChange}>
        <option value="en">en</option>
        <option value="ko">ko</option>
        <option value="ja">ja</option>
      </select>
    </div>
  );
}
