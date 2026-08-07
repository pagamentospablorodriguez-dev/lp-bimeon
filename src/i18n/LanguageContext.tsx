import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { detectLanguage, translations, type Translation } from './index';

type LanguageContextValue = {
  language: string;
  translation: Translation;
  setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): string {
  const savedLanguage = localStorage.getItem('bimeon-language');
  return savedLanguage && translations[savedLanguage] ? savedLanguage : detectLanguage();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(getInitialLanguage);
  const translation = useMemo(() => translations[language] ?? translations.en, [language]);

  const setLanguage = (nextLanguage: string) => {
    if (!translations[nextLanguage]) return;
    setLanguageState(nextLanguage);
    localStorage.setItem('bimeon-language', nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = translation.lang.code;
    document.documentElement.dir = translation.lang.dir;
  }, [translation]);

  return <LanguageContext.Provider value={{ language, translation, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
