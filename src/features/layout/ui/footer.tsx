'use client';

import { useAppConfigContext } from '@/features/app/context/use-app-config-context';
import { toWithoutLangPathname } from '@/features/lang/utils/to-without-lang-pathname';
import { usePathname } from 'next/navigation';

export function Footer() {
  const appConfig = useAppConfigContext();
  const pathname = usePathname();

  const handleLocaleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = evt.target.value;
    const withoutLangPath = toWithoutLangPathname(pathname);
    location.href = `/${lang}${withoutLangPath}`;
  };

  return (
    <div>
      <select value={appConfig.lang} onChange={handleLocaleChange}>
        <option value="en">en</option>
        <option value="ko">ko</option>
        <option value="ja">ja</option>
      </select>
    </div>
  );
}
