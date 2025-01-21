import { PropsWithChildren } from 'react';

export interface NextLayoutProps extends PropsWithChildren {}

export interface NextPageProps {
  params: Promise<unknown>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface AppConfig {
  isApp: boolean;
  isAOS: boolean;
  isIOS: boolean;
  appVersionCode: number;
  appVersionName: string;
}
