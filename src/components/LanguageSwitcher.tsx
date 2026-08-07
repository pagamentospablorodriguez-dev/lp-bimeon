import { Check, ChevronDown, Globe2 } from 'lucide-react';
import { useState } from 'react';
import { supportedLanguages } from '@/i18n';
import { useLanguage } from '@/i18n/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = supportedLanguages.find((item) => item.code === language) ?? supportedLanguages[0];

  return (
    <div className="language-switcher">
      <button className="language-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Change language">
        <Globe2 size={15} />
        <span>{current.name}</span>
        <ChevronDown size={14} className={open ? 'language-chevron open' : 'language-chevron'} />
      </button>
      {open && (
        <div className="language-menu" role="menu">
          {supportedLanguages.map((item) => (
            <button key={item.code} type="button" role="menuitem" className={item.code === language ? 'language-option active' : 'language-option'} onClick={() => { setLanguage(item.code); setOpen(false); }}>
              <span>{item.flag}</span><span>{item.name}</span>{item.code === language && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
