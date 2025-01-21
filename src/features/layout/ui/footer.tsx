'use client';
import { toWithoutLocalePathname } from '@/features/locale/utils/to-without-locale-pathname';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export function Footer() {
  const ttLocale = useLocale();
  const pathname = usePathname();

  const handleLocaleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = evt.target.value;
    const withoutLangPath = toWithoutLocalePathname(pathname);
    location.href = `/${locale}${withoutLangPath}`;
  };

  return (
    <div>
      <select value={ttLocale} onChange={handleLocaleChange}>
        <option value="en">en</option>
        <option value="ko">ko</option>
        <option value="ja">ja</option>
      </select>
    </div>
  );
}
