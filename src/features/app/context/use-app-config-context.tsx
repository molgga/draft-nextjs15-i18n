import { createContext, useContext } from 'react';
import { type AppConfig } from '@/features/app/types';

export const AppConfigContext = createContext<AppConfig>(null!);

export const useAppConfigContext = () => {
  return useContext<AppConfig>(AppConfigContext);
};
