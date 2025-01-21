'use client';
import { PropsWithChildren } from 'react';
import { AppConfigContext } from '@/features/app/context/use-app-config-context';
import * as agentParser from '@/features/app//util/agent-parser';
import { AppConfig } from '@/features/app/types';

interface Props extends PropsWithChildren {
  userAgent: string;
}

export function AppConfigProvider({ userAgent, children }: Props) {
  const matchApp = agentParser.parseApp(userAgent);
  const appConfig: AppConfig = {
    isApp: matchApp.is,
    isAOS: agentParser.parsePlatformAOS(userAgent).is,
    isIOS: agentParser.parsePlatformIOS(userAgent).is,
    appVersionCode: matchApp.versionCode,
    appVersionName: matchApp.versionName,
  };
  return (
    <AppConfigContext.Provider value={appConfig}>
      {children}
      <br />
      <div data-app-config-ua="" className="hidden break-all">
        <div>userAgent: {userAgent}</div>
        <div>{JSON.stringify(appConfig)}</div>
      </div>
    </AppConfigContext.Provider>
  );
}
